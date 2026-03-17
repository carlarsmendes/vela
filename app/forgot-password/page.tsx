import { redirect } from "next/navigation";

import { forgotPasswordAction } from "@/app/auth-actions";
import { PasswordResetRequestForm } from "@/components/password-reset-request-form";
import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";
import { getCurrentUserAppState, getPostAuthPath } from "@/lib/supabase/data";

export default async function ForgotPasswordPage() {
  const appState = await getCurrentUserAppState();

  if (appState.isAuthenticated) {
    redirect(getPostAuthPath(appState));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Reset your password"
        description="Enter your email and Vela will send a reset link if the account exists."
      />

      <SurfaceCard>
        <PasswordResetRequestForm action={forgotPasswordAction} />
      </SurfaceCard>
    </div>
  );
}
