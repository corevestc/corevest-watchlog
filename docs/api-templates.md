# WatchLog template APIs

Base: `http://localhost:3001/api/v1`  
Swagger UI: `http://localhost:3001/docs`  
OpenAPI JSON: `http://localhost:3001/openapi.json`  
JSON: `{ "data": ... }` or `{ "error": { "message": "..." } }`

Run the service with the template composition root:

```bash
cd service
npx tsx watch src/main/main.ts
```

Then `npm run migrate:up`.

BUY is rejected unless **grade A or B**, **RR ≥ 2**, **run_up_pct < 6**, and **plan_entry / plan_stop / plan_target** are set. No completed plan → no BUY → no journal row.

## Auth

Email + password only. `provider` / `provider_id` on `watchlog.users` are reserved for later Google/GitHub login.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/auth/register` | Create account. Body `{ "email", "password" }` (password ≥ 8). `201` + token |
| POST | `/auth/login` | Sign in. Same body. `200` + token |
| GET | `/auth/me` | Current user. Header `Authorization: Bearer <token>` |

Client UI: `http://localhost:5173/account.html` (or `/register.html`, `/login.html`).

## Daily watchlist

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/watchlist?date=YYYY-MM-DD` | List that day's rows (UTC today if omitted) |
| POST | `/watchlist` | Create a row (model list item + optional plan) |
| GET | `/watchlist/:id` | One row |
| PATCH | `/watchlist/:id` | Update plan / grade / context / `modelHits` |
| POST | `/watchlist/:id/decision` | `BUY` / `WATCH` / `SKIP` (`skipReason` required for SKIP) |
| GET | `/watchlist/:id/eligibility` | BUY gate result without changing the row |

POST body (camelCase):

```json
{
  "date": "2026-09-16",
  "scrip": "ABCD",
  "category": "PRIME",
  "prob": 0.82,
  "streak": 3,
  "runUpPct": 1.2,
  "close": 52.0,
  "marketStructure": "UPTREND",
  "setupStage": "EARLY_BREAKOUT",
  "sectorId": 12,
  "relativeVolume": 1.8,
  "grade": "A",
  "planEntry": 52.5,
  "planStop": 50.4,
  "planTarget": 56.2,
  "decision": "WATCH",
  "skipReason": null
}
```

`rewardRisk` (`rr`) is computed by the service, not accepted from the client.

## Trade journal (one row per trade)

`/journal` and `/trades` are the same resource.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/journal` | All trades |
| POST | `/journal` | Entry block — **before** buying; watchlist must already be `BUY` |
| GET | `/journal/:tradeId` | One trade (`CV-0001`) |
| POST | `/journal/:tradeId/exit` | Exit block — fill at exit |

Open body:

```json
{
  "watchlistItemId": "uuid",
  "setupType": "breakout",
  "entryPrice": 52.5,
  "qty": 200,
  "riskPct": 1.5,
  "stop": 50.4,
  "target1": 56.2,
  "target2": 58,
  "marketDay": "GREEN",
  "marketDayChangePct": 0.8,
  "emotion": "calm",
  "checklist": {
    "volConfirm": true,
    "trendAlign": true,
    "notChasing": true,
    "sizeOk": true
  }
}
```

Exit body:

```json
{
  "exitDate": "2026-09-19",
  "exitPrice": 56.1,
  "exitReason": "target",
  "mfePct": 8.1,
  "maePct": -2.2,
  "modelHits": { "d3": true, "d5": true, "d7": false },
  "violations": ["none"],
  "lesson": "held through red day, trail worked",
  "chartFile": "cv0001_exit.png"
}
```

`pnlPct`, `pnlAmt`, `rMultiple`, `daysHeld` are computed when omitted.

## Weekly review

`weekStart` is the **Monday** of the week (metrics cover Mon–Sun).

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/reviews` | All weekly reviews |
| POST | `/reviews` | Generate + persist metrics |
| GET | `/reviews/:weekStart` | One week |

```json
{
  "weekStart": "2026-09-14",
  "topMistake": "chased two NEW names",
  "nextWeekFocus": "only PRIME with RR >= 2"
}
```

Computed: `trades`, `wins`, `winRate`, `avgWinR`, `avgLossR`, `expectancy` = `(win% × avgWinR) − (loss% × avgLossR)`, `adherencePct` (zero-violation trades), `winPctByCategory`, `winPctBySetupType`, `skippedHitRate` (SKIP rows with any `modelHits` horizon set), best/worst trade.

Set `modelHits` (`d3` / `d5` / `d7`) on skipped watchlist rows (PATCH) so skipped-hit rate can be calculated. A skip counts as a hit if any horizon is true.
