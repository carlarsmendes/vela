import { OnboardingForm } from "@/components/onboarding-form";
import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";

export default function OnboardingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Onboarding"
        title="Set a simple starting point"
        description="Begin with your average cycle length, choose your training focus, and see how body metrics fit into Vela."
      />

      <SurfaceCard>
        <OnboardingForm />
      </SurfaceCard>
    </div>
  );
}
