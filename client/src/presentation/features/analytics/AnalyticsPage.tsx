import { PageHeader } from "@/presentation/layouts/PageHeader";

export function AnalyticsPage() {
  return (
    <section>
      <PageHeader
        title="Performance Analytics"
        description="Expectancy, R-multiples, MFE/MAE, model signal history, and discipline metrics will live here."
      />
      <p className="text-sm text-text-100">Analytics charts are not implemented in this architecture step.</p>
    </section>
  );
}
