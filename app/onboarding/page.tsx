import { redirect } from "next/navigation";

import { saveOnboardingAction } from "@/app/data-actions";
import { OnboardingForm } from "@/components/onboarding-form";
import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";
import { getCurrentUserContext, getProfile } from "@/lib/supabase/data";

export default async function OnboardingPage() {
  const { user } = await getCurrentUserContext();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await getProfile(user.id);
  const initialDraft = {
    averageCycleLength: profile?.average_cycle_length?.toString() ?? "28",
    trainingFocus: profile?.training_focus ?? "both",
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Onboarding"
        title="Set a simple starting point"
        description="Begin with your average cycle length, choose your training focus, and see how body metrics fit into Vela."
      />

      <SurfaceCard>
        <OnboardingForm action={saveOnboardingAction} initialDraft={initialDraft} />
      </SurfaceCard>
    </div>
  );
}
