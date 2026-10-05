# WatchLog database

PostgreSQL is the system of record for WatchLog decisions, trades, journal entries, reviews, and analytics derived from those records.

This folder holds:

- `migrations/` — versioned schema changes, run via `node-pg-migrate` from `service/`
- `seeds/` — optional reference data later (not used in the architecture phase)

## What belongs here

- Watchlist plans and eligibility snapshots
- Planned and actual trades
- Journal, violations, MFE/MAE
- Weekly reviews
- Cached or imported DSE stock master / model-signal history that WatchLog needs to persist

## What does not belong here

- The Python DSE collector’s raw feature warehouse, unless explicitly imported through the integration boundary
- Business rules (those live in `service/src/domain` and application use cases)

## Commands

Copy `.env.example` to `.env`, start Postgres, then from `service/`:

```bash
npm run migrate:create -- name_of_change
npm run migrate:up
```

No application schema has been created yet. Do not add tables until the schema design step.
