# WatchLog architecture

WatchLog is a trading-discipline application for CoreVest Capital. It follows **Clean Architecture**. Dependencies point inward toward business rules.

This is still an architecture phase. Domain modules are bounded, not fully implemented.

## System shape

WatchLog is **one frontend + one Node service + PostgreSQL**.

```
┌────────────────────────┐     HTTP / JSON      ┌─────────────────────────┐
│ WatchLog client        │ ───────────────────► │ WatchLog service        │
│ presentation → app     │                      │ interface → application │
│ → domain               │                      │ → domain                │
└────────────────────────┘                      └────────────┬────────────┘
                                                             │ infrastructure
                                                             ▼
                                                  ┌─────────────────────┐
                                                  │     PostgreSQL      │
                                                  └─────────────────────┘
                                                             ▲
              ModelSignalProvider / MarketDataProvider       │
┌──────────────────────────┐                                 │
│ Independent Python DSE   │ ◄── DseModelSignalClient ───────┘
│ collector + ML signals   │     infrastructure/dse-service
└──────────────────────────┘
```

There are no WatchLog microservices at this stage.

## Clean Architecture layers (backend)

Location: `service/src/`

```
HTTP route → controller → use case → port ← repository / DSE client
                              ↓
                           domain
```

| Layer | Path | Responsibility |
| --- | --- | --- |
| Domain | `domain/` | WatchLog concepts and rules. No NestJS, pg, HTTP, env, or React. |
| Application | `application/` | Use cases. Depends on domain + ports only. |
| Interface | `interface/http/` | HTTP controllers, routes, DTOs, middleware. |
| Infrastructure | `infrastructure/` | PostgreSQL, DSE clients, config, logging. |
| Main | `main/` | Composition root. Wires concrete implementations into use cases. |

### Domain

Concepts (types + the known BUY rule only):

- `WatchlistItem`, `TradingPlan`
- `Trade`, `TradeExit`
- `Violation`, `TradingLesson`
- `WeeklyReview`
- `ModelSignal`

BUY eligibility lives in `domain/watchlist/evaluate-buy-eligibility.ts`.

### Application

Use cases such as `GetDailyWatchlist`, `EvaluateWatchlistDecision`, `CreateTrade`, `CloseTrade`, `RecordViolation`, `GenerateWeeklyReview`, `CalculateExpectancy`.

Mutating/calculation use cases exist as boundaries and throw `NotImplementedError` until a later step.

Ports (abstractions):

- `WatchlistRepository`
- `TradeRepository`
- `JournalRepository`
- `ReviewRepository`
- `ModelSignalProvider`
- `MarketDataProvider`

### Interface

Controllers receive HTTP, call a use case, return JSON. They do not run SQL, BUY rules, R-multiple math, or the Python client.

### Infrastructure

- `Postgres*Repository` implements repository ports
- `DseModelSignalClient` implements `ModelSignalProvider`
- `DseMarketDataClient` implements `MarketDataProvider`
- PostgreSQL pool and env loading

### Composition

`main/app.module.ts` assembles:

```
PostgresTradeRepository
  → TradeRepository (port)
    → GetTrades (use case)
      → TradeController
        → HTTP route
```

## Frontend layers

Location: `client/src/`

| Layer | Path | Responsibility |
| --- | --- | --- |
| Domain | `domain/` | Client-side WatchLog types and BUY eligibility |
| Application | `application/` | Use cases (`evaluateWatchlistDecision`, `GetDailyWatchlist`) and `WatchLogApi` port |
| Infrastructure | `infrastructure/http/` | `HttpWatchLogApi`, fetch |
| Presentation | `presentation/` | React pages, layouts, routes, theme |
| UI kit | `components/` | TailGrids primitives (presentation/UI). Path kept so primitives keep importing `@/utils/cn` |
| Main | `main/` | Vite entry + client composition |

The BUY rule must not live only in a page or button. `WatchlistPage` calls `evaluateWatchlistDecision` from the application layer.

TailGrids is a **presentation/UI source**. It is not the source of trading rules. The original kit remains in `./tailgrids/` and is not imported at runtime.

## Python DSE service

External system. WatchLog does not copy it.

Application depends only on `ModelSignalProvider`. Transport (REST, queue, etc.) is an infrastructure detail of `DseModelSignalClient`.

## PostgreSQL

Infrastructure. Table rows are not domain entities. Schema is not created in this phase. Migrations remain in `database/migrations`.

## Dependency rule

See [dependency-rules.md](dependency-rules.md).

## Out of scope here

Authentication, full schema, complete workflows, fake trading data, ML integration.
