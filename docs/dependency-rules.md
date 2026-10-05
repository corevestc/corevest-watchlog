# WatchLog dependency rules

Clean Architecture **dependency rule**: source code dependencies point inward, toward domain rules.

## Matrix

| Layer          | Can depend on                                        |
| -------------- | ---------------------------------------------------- |
| Domain         | Domain/shared only                                   |
| Application    | Domain + application ports                           |
| Interface      | Application                                          |
| Infrastructure | Application/domain contracts + external technologies |
| Main           | All layers for composition                           |

## Backend

Allowed:

```
main → infrastructure, interface, application
interface → application
infrastructure → application ports, domain types
application → domain, application ports
domain → (nothing outside domain)
```

Forbidden:

```
domain → infrastructure | interface | main | pg | NestJS | env | React
application → PostgreSQL implementations | NestJS | React
interface → pg | DSE HTTP client | trading math
```

Typical flow:

```
Route → Controller → Use case → Port
                         ↑
              Postgres repository / DseModelSignalClient
```

## Frontend

Allowed:

```
main → presentation, application, infrastructure
presentation → application, domain, UI kit
infrastructure → application ports, domain types
application → domain, application ports
domain → (nothing outside domain)
```

Forbidden:

```
domain → React | fetch | TailGrids
application → React | fetch
presentation → PostgreSQL | Python DSE internals
```

BUY eligibility is in `domain/watchlist` and exposed through `application/watchlist/evaluate-watchlist-decision`. Pages must call that, not encode the rule in JSX.

## External systems

| System | Layer |
| --- | --- |
| PostgreSQL | Infrastructure |
| Python DSE application | External system, reached only via `infrastructure/dse-service` |
| TailGrids | Presentation/UI source (`client/src/components`, original kit in `./tailgrids/`) |
| NestJS | Interface + main |
| Vite / React | Presentation + main |
