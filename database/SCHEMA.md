# WatchLog template schema

Tables live in Postgres database **`stockdb`**, schema **`watchlog`** (shared with the DSE app, isolated from DSE tables).

## Migrate

From `service/`, with `DATABASE_URL` pointing at `stockdb`:

```bash
npx tsx src/main/migrate-cli.ts
```

Startup also applies pending migrations. Migrations: `database/migrations/20260919120000_watchlog-templates.js`, `database/migrations/20260926200000_watchlog-users.js`, `database/migrations/20260926210000_watchlog-model-hits.js`, `database/migrations/20260927210000_ml-watchlist.js`.

## Tables (`watchlog` schema)

### `users`

One row per account. Unique `email`. `password_hash` is set for local accounts and left null for future social sign-in. `provider` is `local` | `google` | `github`; unique `(provider, provider_id)` for social rows.

### `watchlist_items`

One row per scrip per list day. Unique `(date, scrip)`. `model_hits` is JSON `{ d3, d5, d7 }` (nullable booleans) for the 3 / 5 / 7 day models.

### `trade_journal`

One row per trade (`trade_id` like `CV-0001`). Same `model_hits` JSON as the watchlist.

### `weekly_reviews`

One row per `week_start` (Monday).

### `ml_watchlist`

One signal per `(trade_date, stock_id, source)`. `source` is `V1`, `V2`, `BO`, or `HUMAN`. `probability` is null for human picks. `extra_metrics` holds flexible model fields (`target_pct` / `targetPct` is copied onto the outcome row).

### `watchlist_selections`

One human decision per `(trade_date, stock_id)`. `decision` is `BUY`, `WATCH`, or `SKIP`. `risk_reward` is `(planned_target - planned_entry) / (planned_entry - planned_stop)`.

### `watchlist_outcomes`

One result per `(trade_date, stock_id, source)`. Status starts `PENDING`. `POST /api/v1/watchlist/outcomes` fills `max_return_actual` from `public.stock_ml_features_daily.future_max_return_5d` using the same numeric unit as that column (no percent conversion). A null forward return leaves the row `PENDING`.
