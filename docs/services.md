# CoreVest apps and stockdb

Personal setup: **one Postgres (`stockdb`)**, more than one application. Not microservices.

## Shared database

```
DATABASE_URL=postgres://postgres:***@localhost:5432/stockdb
```

| Schema | Owner | Tables |
| --- | --- | --- |
| `public` (and existing DSE schemas) | Python DSE | Historical bars, features, ML signals |
| `watchlog` | WatchLog migrations | `users`, `watchlist_items`, `trade_journal`, `weekly_reviews` |

A new personal app can use the same `DATABASE_URL`. It should read/write WatchLog tables only through this API or the same table names — it must not create a parallel journal schema.

## What does not change

- WatchLog remains one Node API + one (optional) React client.
- BUY gates stay in WatchLog domain.
- DSE collector stays a separate process you deploy when you want.

See [integration.md](integration.md).
