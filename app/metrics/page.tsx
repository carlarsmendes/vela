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
import { getCurrentUserAppState, getRecentBodyEntries } from "@/lib/supabase/data";

export default async function MetricsPage() {
  const appState = await getCurrentUserAppState();

  if (!appState.isAuthenticated) {
    redirect("/login");
  }

  if (!appState.isOnboardingComplete) {
    redirect("/onboarding");
  }

  const { data: entries, error } = await getRecentBodyEntries(appState.userId as string);
  const setupIncomplete = error?.code === "42P01";
  const defaultDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Metrics"
        title="Body metrics"
        description="Track weight and measurements in one place, then build toward simple trends over time."
      />

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Log a new entry</h2>
          <p className="text-sm leading-6 text-stone">
            Weight can be logged more frequently. Measurements can stay on a weekly rhythm.
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
          <h2 className="text-lg font-semibold tracking-tight text-ink">Trends</h2>
          <p className="text-sm leading-6 text-stone">
            Charts will live here once Vela has enough logged data to show useful movement over
            time.
          </p>
        </div>

        <div className="space-y-3">
          <div className="border border-line bg-[#f7f3ee] px-4 py-5">
            <p className="text-xs uppercase tracking-[0.16em] text-pine">Weight trend</p>
            <p className="mt-2 text-sm leading-6 text-stone">
              Placeholder for a simple weight-over-time view.
            </p>
          </div>
          <div className="border border-line bg-[#f7f3ee] px-4 py-5">
            <p className="text-xs uppercase tracking-[0.16em] text-pine">Measurements trend</p>
            <p className="mt-2 text-sm leading-6 text-stone">
              Placeholder for waist, hips, bust, thigh, arm, neck, and body fat trends.
            </p>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Recent entries</h2>
          <p className="text-sm leading-6 text-stone">
            Review, correct, or remove recent entries as your log evolves.
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
