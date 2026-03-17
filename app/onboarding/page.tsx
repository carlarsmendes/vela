import { redirect } from "next/navigation";

import { saveOnboardingAction } from "@/app/data-actions";
import { OnboardingForm } from "@/components/onboarding-form";
import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";
import { getCurrentUserAppState } from "@/lib/supabase/data";

export default async function OnboardingPage() {
  const appState = await getCurrentUserAppState();

  if (!appState.isAuthenticated) {
    redirect("/login");
  }

  const initialDraft = {
    averageCycleLength: appState.profile?.average_cycle_length?.toString() ?? "28",
    trainingFocus: appState.profile?.training_focus ?? "both",
  };

  if (appState.isOnboardingComplete) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Onboarding"
        title="Set a simple starting point"
        description="Set the baseline Vela will use before you begin tracking cycle and training context."
      />

      <SurfaceCard>
        <OnboardingForm action={saveOnboardingAction} initialDraft={initialDraft} />
      </SurfaceCard>
    </div>
  );
}
