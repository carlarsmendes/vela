import { redirect } from "next/navigation";

import { signupAction } from "@/app/auth-actions";
import { AuthForm } from "@/components/auth-form";
import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";
import { getCurrentUserAppState, getPostAuthPath } from "@/lib/supabase/data";

export default async function SignupPage() {
  const appState = await getCurrentUserAppState();

  if (appState.isAuthenticated) {
    redirect(getPostAuthPath(appState));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Sign up"
        description="Create your account first, then continue into onboarding."
      />

      <SurfaceCard>
        <AuthForm
          action={signupAction}
          alternateHref="/login"
          alternateLabel="Already have an account?"
          description="This starts the email/password flow. Confirmation still depends on your Supabase project settings."
          mode="signup"
        />
      </SurfaceCard>
    </div>
  );
}
