import { PageHeader } from "@/presentation/layouts/PageHeader";

export function JournalPage() {
  return (
    <section>
      <PageHeader
        title="Trade Journal"
        description="Record planned entry, stop, target, risk, and quantity. After exit, capture P&L, R, hold days, MFE, MAE, model hit, violations, and lesson."
      />
      <p className="text-sm text-text-100">Journal forms are not implemented in this architecture step.</p>
    </section>
  );
}
