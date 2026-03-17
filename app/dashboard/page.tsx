import { redirect } from "next/navigation";

import {
  createPeriodEntryAction,
  deletePeriodEntryAction,
  updatePeriodEntryAction,
} from "@/app/data-actions";
import { CycleHistoryList } from "@/components/cycle-history-list";
import { PageHeader } from "@/components/page-header";
import { PeriodEntryForm } from "@/components/period-entry-form";
import { SurfaceCard } from "@/components/surface-card";
import { buildCycleSummary } from "@/lib/cycle";
import {
  buildCycleHistory,
  getCurrentUserAppState,
  getRecentPeriodEntries,
} from "@/lib/supabase/data";

export default async function DashboardPage() {
  const appState = await getCurrentUserAppState();

  if (!appState.isAuthenticated) {
    redirect("/login");
  }

  if (!appState.isOnboardingComplete) {
    redirect("/onboarding");
  }

  const { data: periodEntries, error: periodEntriesError } = await getRecentPeriodEntries(
    appState.userId as string,
  );
  const setupIncomplete = periodEntriesError?.code === "42P01";
  const defaultDate = new Date().toISOString().slice(0, 10);
  const cycleHistory = buildCycleHistory(periodEntries);
  const cycleSummary = buildCycleSummary(appState.profile, periodEntries);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Today"
        description="The main view keeps cycle timing and training context in the same calm place."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SurfaceCard className="space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-pine">Current phase</p>
          <p className="text-2xl font-semibold tracking-tight text-ink">{cycleSummary.currentPhase}</p>
        </SurfaceCard>
        <SurfaceCard className="space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-pine">Cycle day</p>
          <p className="text-2xl font-semibold tracking-tight text-ink">
            {cycleSummary.cycleDay ?? "Not enough data"}
          </p>
        </SurfaceCard>
        <SurfaceCard className="space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-pine">Predicted next period</p>
          <p className="text-base font-medium text-ink">
            {cycleSummary.predictedNextPeriod ?? "Need more history"}
          </p>
        </SurfaceCard>
        <SurfaceCard className="space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-pine">Days until next period</p>
          <p className="text-base font-medium text-ink">
            {cycleSummary.daysUntilNextPeriod !== null
              ? cycleSummary.daysUntilNextPeriod
              : "Need more history"}
          </p>
        </SurfaceCard>
      </div>

      <SurfaceCard className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-pine">Training recommendation</p>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            {cycleSummary.trainingRecommendation}
          </h2>
          <p className="text-sm leading-6 text-stone">{cycleSummary.recommendationDetail}</p>
        </div>
      </SurfaceCard>

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Log period start</h2>
          <p className="text-sm leading-6 text-stone">
            Add the first day of each period so Vela can start building useful cycle history.
          </p>
        </div>

        {setupIncomplete ? (
          <div className="border border-[#efc5bc] bg-[#fff4f1] px-4 py-3 text-sm leading-6 text-[#7b3f31]">
            Run the updated SQL in <code>supabase/schema.sql</code> inside your Supabase SQL editor
            before saving period starts.
          </div>
        ) : null}

        <PeriodEntryForm action={createPeriodEntryAction} defaultDate={defaultDate} />
      </SurfaceCard>

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Cycle history</h2>
          <p className="text-sm leading-6 text-stone">
            Recent period starts and the days between them give Vela its first timing picture.
          </p>
        </div>

        <CycleHistoryList
          deleteAction={deletePeriodEntryAction}
          history={cycleHistory}
          periodEntries={periodEntries}
          updateAction={updatePeriodEntryAction}
        />
      </SurfaceCard>
    </div>
  );
}
