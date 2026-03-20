import { redirect } from "next/navigation";

import {
  createBodyEntryAction,
  deleteBodyEntryAction,
  updateBodyEntryAction,
} from "@/app/data-actions";
import { BodyEntryForm } from "@/components/body-entry-form";
import { BodyEntryList } from "@/components/body-entry-list";
import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";
import { WeightTrendChart } from "@/components/weight-trend-chart";
import { buildWeightTrend, getCurrentUserAppState, getRecentBodyEntries } from "@/lib/supabase/data";

export default async function MetricsPage() {
  const appState = await getCurrentUserAppState();

  if (!appState.isAuthenticated) {
    redirect("/login");
  }

  if (!appState.isOnboardingComplete) {
    redirect("/onboarding");
  }

  const { data: entries, error } = await getRecentBodyEntries(appState.userId as string, 12);
  const setupIncomplete = error?.code === "42P01";
  const defaultDate = new Date().toISOString().slice(0, 10);
  const weightTrend = buildWeightTrend(entries);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Metrics"
        title="Body metrics"
        description="See trends first, then add new entries when you need to update the record."
      />

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Trends</h2>
          <p className="text-sm leading-6 text-stone">
            Start with weight, then add more trend views as your record builds.
          </p>
        </div>

        <div className="space-y-3">
          <WeightTrendChart isSample={weightTrend.isSample} points={weightTrend.points} />
          <div className="border border-line bg-[#f7f3ee] px-4 py-5">
            <p className="text-xs uppercase tracking-[0.16em] text-pine">Measurements trend</p>
            <p className="mt-2 text-sm leading-6 text-stone">
              Waist, hips, bust, thigh, arm, neck, and body fat trends will appear here.
            </p>
          </div>
        </div>
      </SurfaceCard>

      <div className="flex justify-start">
        <a
          className="inline-flex items-center justify-center border border-moss bg-moss px-4 py-3 text-sm font-medium text-mist transition hover:bg-pine"
          href="#log-new-entry"
        >
          Log new entry
        </a>
      </div>

      <SurfaceCard className="space-y-4" id="log-new-entry">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Log a new entry</h2>
          <p className="text-sm leading-6 text-stone">
            Weight may be worth logging more often. Measurements can stay on a slower weekly rhythm.
          </p>
        </div>

        {setupIncomplete ? (
          <div className="border border-[#efc5bc] bg-[#fff4f1] px-4 py-3 text-sm leading-6 text-[#7b3f31]">
            Run the SQL in <code>supabase/schema.sql</code> inside Supabase before saving metrics.
          </div>
        ) : null}

        <BodyEntryForm action={createBodyEntryAction} defaultDate={defaultDate} />
      </SurfaceCard>

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Recent entries</h2>
          <p className="text-sm leading-6 text-stone">
            Review, correct, or remove recent entries as your record takes shape.
          </p>
        </div>

        <BodyEntryList
          deleteAction={deleteBodyEntryAction}
          entries={entries}
          updateAction={updateBodyEntryAction}
        />
      </SurfaceCard>
    </div>
  );
}
