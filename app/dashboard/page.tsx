import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";
import { dashboardCards } from "@/lib/site";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Your space at a glance"
        description="A practical overview for cycle timing, body metrics, and lightweight training support."
      />

      <SurfaceCard className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-pine">Coming next</p>
        <p className="text-sm leading-6 text-stone">
          The next layer will connect onboarding to real auth state, then add body entry logging
          with only the fields a user chooses to fill.
        </p>
      </SurfaceCard>

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
