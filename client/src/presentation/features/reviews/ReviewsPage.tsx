import { PageHeader } from "@/presentation/layouts/PageHeader";

export function ReviewsPage() {
  return (
    <section>
      <PageHeader
        title="Weekly Review"
        description="Process review: plan quality, rule adherence, and lessons. Review logic is deferred."
      />
      <p className="text-sm text-text-100">Review workflows are not implemented in this architecture step.</p>
    </section>
  );
}
