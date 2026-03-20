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
        description="The main view for your current phase, training context, and the timing signals that matter most."
      />

      <SurfaceCard className="overflow-hidden border-pine/20 bg-[linear-gradient(180deg,rgba(84,104,90,0.12),rgba(248,243,237,0.98)_38%)]">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-pine">Current phase</p>
            <p className="text-3xl font-semibold tracking-tight text-ink">{cycleSummary.currentPhase}</p>
          </div>

          <div className="space-y-2 border-l-2 border-moss/40 pl-4">
            <p className="text-xs uppercase tracking-[0.18em] text-pine">Today&apos;s recommendation</p>
            <h2 className="text-2xl font-semibold tracking-tight text-moss">
              {cycleSummary.trainingRecommendation}
            </h2>
            <p className="max-w-lg text-sm leading-7 text-stone">{cycleSummary.recommendationDetail}</p>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-4 sm:grid-cols-3">
        <SurfaceCard className="space-y-1 border-pine/15 bg-[#f7f1ea]">
          <p className="text-xs uppercase tracking-[0.16em] text-pine">Cycle day</p>
          <p className="text-2xl font-semibold tracking-tight text-ink">
            {cycleSummary.cycleDay ?? "Need more data"}
          </p>
        </SurfaceCard>
        <SurfaceCard className="space-y-1 border-pine/15 bg-[#f7f1ea]">
          <p className="text-xs uppercase tracking-[0.16em] text-pine">Predicted next period</p>
          <p className="text-base font-medium text-ink">
            {cycleSummary.predictedNextPeriod ?? "Need more history"}
          </p>
        </SurfaceCard>
        <SurfaceCard className="space-y-1 border-pine/15 bg-[#f7f1ea]">
          <p className="text-xs uppercase tracking-[0.16em] text-pine">Days until next period</p>
          <p className="text-2xl font-semibold tracking-tight text-ink">
            {cycleSummary.daysUntilNextPeriod !== null
              ? cycleSummary.daysUntilNextPeriod
              : "Need more history"}
          </p>
        </SurfaceCard>
      </div>

      <details className="group overflow-hidden rounded-lg border border-line bg-bone/90 shadow-panel" open={periodEntries.length === 0}>
        <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold tracking-tight text-ink">Log period start</p>
            <p className="text-sm leading-6 text-stone">
              Add a new period start when you need to update your cycle record.
            </p>
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-pine transition group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="space-y-4 border-t border-line/80 px-5 py-5">
          {setupIncomplete ? (
            <div className="border border-[#efc5bc] bg-[#fff4f1] px-4 py-3 text-sm leading-6 text-[#7b3f31]">
              Run the updated SQL in <code>supabase/schema.sql</code> inside your Supabase SQL editor
              before saving period starts.
            </div>
          ) : null}

          <PeriodEntryForm action={createPeriodEntryAction} defaultDate={defaultDate} />
        </div>
      </details>

      <details className="group overflow-hidden rounded-lg border border-line bg-bone/90 shadow-panel">
        <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold tracking-tight text-ink">Cycle history</p>
            <p className="text-sm leading-6 text-stone">
              Review recent starts and the days between them when you want a broader picture.
            </p>
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-pine transition group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="border-t border-line/80 px-5 py-5">
          <CycleHistoryList
            deleteAction={deletePeriodEntryAction}
            history={cycleHistory}
            periodEntries={periodEntries}
            updateAction={updatePeriodEntryAction}
          />
        </div>
      </details>
    </div>
  );
}
