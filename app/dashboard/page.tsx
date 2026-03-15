import { redirect } from "next/navigation";

import {
  createBodyEntryAction,
  createPeriodEntryAction,
  deleteBodyEntryAction,
  updateBodyEntryAction,
} from "@/app/data-actions";
import { BodyEntryForm } from "@/components/body-entry-form";
import { BodyEntryList } from "@/components/body-entry-list";
import { CycleHistoryList } from "@/components/cycle-history-list";
import { PageHeader } from "@/components/page-header";
import { PeriodEntryForm } from "@/components/period-entry-form";
import { SurfaceCard } from "@/components/surface-card";
import { dashboardCards } from "@/lib/site";
import {
  buildCycleHistory,
  getCurrentUserContext,
  getProfile,
  getRecentBodyEntries,
  getRecentPeriodEntries,
} from "@/lib/supabase/data";

export default async function DashboardPage() {
  const { user } = await getCurrentUserContext();

  if (!user) {
    redirect("/login");
  }

  const [
    { data: profile, error: profileError },
    { data: entries, error: entriesError },
    { data: periodEntries, error: periodEntriesError },
  ] = await Promise.all([
    getProfile(user.id),
    getRecentBodyEntries(user.id),
    getRecentPeriodEntries(user.id),
  ]);
  const setupIncomplete =
    profileError?.code === "42P01" ||
    entriesError?.code === "42P01" ||
    periodEntriesError?.code === "42P01";
  const defaultDate = new Date().toISOString().slice(0, 10);
  const cycleHistory = buildCycleHistory(periodEntries);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Your space at a glance"
        description="A practical overview for cycle timing, body metrics, and lightweight training support."
      />

      <SurfaceCard className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-pine">Profile</p>
        {profile ? (
          <div className="space-y-2 text-sm leading-6 text-stone">
            <p>Average cycle length: {profile.average_cycle_length ?? "Not set yet"}</p>
            <p>
              Training focus:{" "}
              {profile.training_focus
                ? profile.training_focus.charAt(0).toUpperCase() + profile.training_focus.slice(1)
                : "Not set yet"}
            </p>
          </div>
        ) : (
          <p className="text-sm leading-6 text-stone">
            Save onboarding first so your starting profile appears here.
          </p>
        )}
      </SurfaceCard>

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Log body metrics</h2>
          <p className="text-sm leading-6 text-stone">
            Save weight whenever useful and add measurements on a slower rhythm when you want more
            context.
          </p>
        </div>

        {setupIncomplete ? (
          <div className="rounded-2xl border border-[#efc5bc] bg-[#fff4f1] px-4 py-3 text-sm leading-6 text-[#7b3f31]">
            Run the SQL in <code>supabase/schema.sql</code> inside your Supabase SQL editor before
            saving onboarding or body entries.
          </div>
        ) : null}

        <BodyEntryForm action={createBodyEntryAction} defaultDate={defaultDate} />
      </SurfaceCard>

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Log period start</h2>
          <p className="text-sm leading-6 text-stone">
            Add the first day of each period so Vela can start building useful cycle history.
          </p>
        </div>

        {setupIncomplete ? (
          <div className="rounded-2xl border border-[#efc5bc] bg-[#fff4f1] px-4 py-3 text-sm leading-6 text-[#7b3f31]">
            Run the updated SQL in <code>supabase/schema.sql</code> inside your Supabase SQL editor
            before saving period starts.
          </div>
        ) : null}

        <PeriodEntryForm action={createPeriodEntryAction} defaultDate={defaultDate} />
      </SurfaceCard>

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Recent body entries</h2>
          <p className="text-sm leading-6 text-stone">
            A short recent history gives you a practical view without turning this into a full data
            dump.
          </p>
        </div>

        <BodyEntryList
          deleteAction={deleteBodyEntryAction}
          entries={entries}
          updateAction={updateBodyEntryAction}
        />
      </SurfaceCard>

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Cycle history</h2>
          <p className="text-sm leading-6 text-stone">
            A first simple history view of recent period starts and the days between them.
          </p>
        </div>

        <CycleHistoryList history={cycleHistory} periodEntries={periodEntries} />
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
