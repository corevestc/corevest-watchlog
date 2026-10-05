# WatchLog API

Conceptual API surface for WatchLog. Endpoints are versioned under `/api/v1`. HTTP adapters call application use cases; handlers do not contain trading rules.

Base URL (local): `http://localhost:3001`

## Conventions

- JSON request and response bodies
- Collection reads: `{ "data": ... }`
- Errors: `{ "error": { "message": "..." } }`
- Unimplemented mutating use cases: HTTP 501
- No authentication in this phase

## Health

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Process liveness plus PostgreSQL `SELECT 1` |

## `/api/watchlist` → `/api/v1/watchlist`

Daily watchlist and planned trades.

Future resources:

- List today’s watchlist
- Create / update a watchlist row
- Complete a plan (entry, stop, target, risk, quantity)
- Evaluate BUY eligibility (grade, RR, run-up, completed plan)

Placeholder: `GET /api/v1/watchlist`

## `/api/trades` → `/api/v1/trades`

Open positions and closed trades.

Future resources:

- Open a position from a completed plan
- List open positions
- Close a trade
- List closed trades
- Attach MFE / MAE

Placeholder: `GET /api/v1/trades`

## `/api/journal` → `/api/v1/journal`

Post-trade journal.

Future resources:

- Record planned entry/stop/target/risk/quantity
- After exit: P&L, R multiple, days held, MFE, MAE, model hit, violations, lesson

Placeholder: `GET /api/v1/journal`

## `/api/reviews` → `/api/v1/reviews`

Weekly process review.

Future resources:

- Create a weekly review
- List reviews
- Link trades, violations, and lessons for the week

Placeholder: `GET /api/v1/reviews`

## `/api/analytics` → `/api/v1/analytics`

Performance and discipline analytics.

Future resources:

- Expectancy and R-multiple distributions
- Discipline / violation rates
- MFE / MAE analysis
- Hold-time statistics

Placeholder: `GET /api/v1/analytics`

## `/api/market` → `/api/v1/market`

Market context and DSE reference data owned or cached by WatchLog.

Future resources:

- Stock master / symbol lookup
- Market structure / context snapshot used by WatchLog
- Import jobs from the Python DSE application (via the integration client, not by copying Python code)

Placeholder: `GET /api/v1/market`

## `/api/model-signals` → `/api/v1/model-signals`

Model signal history as consumed by WatchLog.

Future resources:

- List stored signals
- Fetch latest signals from the Python app through `infrastructure/dse-service` (`ModelSignalProvider`)
- Join signals to trades (model hit)

Placeholder: `GET /api/v1/model-signals`

## Out of scope for this phase

Full request/response schemas, pagination contracts, and write endpoints will be specified when each module is implemented.
