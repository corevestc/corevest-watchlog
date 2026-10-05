# WatchLog business rules

High-level rules known today. They are documented here so frontend and backend share one source of meaning. They are **not implemented** in this architecture phase.

## Watchlist

A BUY is allowed only when all of the following are true:

- Grade is **A** or **B**
- Reward-to-risk **RR >= 2**
- `run_up_pct` **< 6%**
- The plan row is **completed** (planned entry, stop, target, risk, and quantity are present)

If the plan is not completed, there is **no trade**.

These checks belong in the **domain** (`evaluateBuyEligibility`) and are invoked through application use cases. They must not live only in React pages or in SQL repositories.

## Trade journal

### Record at plan time

- Entry
- Stop
- Target
- Risk
- Quantity

### Record after exit

- P&L
- R multiple
- Days held
- MFE
- MAE
- Model hit
- Violations
- Lesson

Journal screens collect these fields. Calculation of R, MFE, MAE, and violation classification belongs in backend services.
