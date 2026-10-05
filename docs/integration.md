# Service integration

WatchLog and the Python DSE app are **separate deployables** that share one Postgres database: `stockdb`. This is for personal use and deployment flexibility, not microservices.

## Database

| App | Database | What it owns |
| --- | --- | --- |
| Python DSE | `stockdb` (typically `public`) | Bars, features, signals |
| WatchLog (and later personal apps) | same `stockdb`, schema `watchlog` | Watchlist, journal, weekly review |

`DATABASE_URL` points at `stockdb`. WatchLog does **not** use a second database.

WatchLog must not alter DSE tables. DSE should not alter `watchlog.*` tables. Schema migrations for WatchLog stay in this repo (`database/migrations`).

```
Python DSE  ──┐
              ├──  stockdb
WatchLog API ─┤      public     → DSE data
Other apps  ──┘      watchlog   → users, watchlist_items, trade_journal, weekly_reviews
```

Model signals can still be read later via `ModelSignalProvider` (HTTP) or, for this personal setup, from `stockdb` tables the other app already writes. Keep BUY / plan rules in WatchLog domain or API so a second app does not reimplement them in SQL.
