import { NavLink } from "react-router-dom";
import { PageHeader } from "@/presentation/layouts/PageHeader";
import { paths } from "@/presentation/routes/paths";

export function TradesPage() {
  return (
    <section>
      <PageHeader
        title="Trades"
        description="Planned and executed trades. Open and closed books are split for later position and R-multiple analysis."
      />
      <div className="flex gap-3 text-sm">
        <NavLink className="text-primary-500 hover:text-primary-600" to={paths.openPositions}>
          Open positions
        </NavLink>
        <NavLink className="text-primary-500 hover:text-primary-600" to={paths.closedTrades}>
          Closed trades
        </NavLink>
      </div>
    </section>
  );
}

export function OpenPositionsPage() {
  return (
    <section>
      <PageHeader
        title="Open Positions"
        description="Active trades with planned stop/target and later MFE/MAE capture."
      />
      <p className="text-sm text-text-100">No open positions loaded. Schema and APIs are not implemented yet.</p>
    </section>
  );
}

export function ClosedTradesPage() {
  return (
    <section>
      <PageHeader
        title="Closed Trades"
        description="Exited trades with P&L, R multiple, hold duration, and model-hit fields."
      />
      <p className="text-sm text-text-100">No closed trades loaded. Schema and APIs are not implemented yet.</p>
    </section>
  );
}
