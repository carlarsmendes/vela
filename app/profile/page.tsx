import { redirect } from "next/navigation";

import { saveOnboardingAction } from "@/app/data-actions";
import { PageHeader } from "@/components/page-header";
import { ProfileSettingsForm } from "@/components/profile-settings-form";
import { SurfaceCard } from "@/components/surface-card";
import { getCurrentUserAppState } from "@/lib/supabase/data";

export default async function ProfilePage() {
  const appState = await getCurrentUserAppState();

  if (!appState.isAuthenticated) {
    redirect("/login");
  }

  if (!appState.isOnboardingComplete) {
    redirect("/onboarding");
  }

  const initialDraft = {
    averageCycleLength: appState.profile?.average_cycle_length?.toString() ?? "28",
    trainingFocus: appState.profile?.training_focus ?? "both",
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Profile"
        title="Profile"
        description="Your cycle baseline and training focus live here once your account is set up."
      />

      <SurfaceCard className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Training profile</h2>
          <p className="text-sm leading-6 text-stone">
            Update the cycle length and training focus Vela uses as your working baseline.
          </p>
        </div>

        <ProfileSettingsForm action={saveOnboardingAction} initialDraft={initialDraft} />
      </SurfaceCard>

      <SurfaceCard className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-pine">Account</p>
        <p className="text-sm leading-6 text-stone">
          Signed in as {appState.userEmail ?? "your account"}.
        </p>
      </SurfaceCard>
    </div>
  );
}
