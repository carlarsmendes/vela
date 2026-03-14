import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";
import { dashboardCards } from "@/lib/site";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Your space at a glance"
        description="A practical overview for cycle tracking, body metrics, and future guidance."
      />

      <div className="grid gap-4">
        {dashboardCards.map((card) => (
          <SurfaceCard key={card.title} className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight text-ink">{card.title}</h2>
            <p className="text-sm leading-6 text-stone">{card.body}</p>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}
