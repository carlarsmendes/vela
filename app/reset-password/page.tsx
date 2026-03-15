import { updatePasswordAction } from "@/app/auth-actions";
import { PasswordUpdateForm } from "@/components/password-update-form";
import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ResetPasswordPage() {
  let hasRecoverySession = false;

  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    hasRecoverySession = Boolean(user);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Choose a new password"
        description="Open this page from your email recovery link, then set the new password you want to use."
      />

      <SurfaceCard className="space-y-4">
        {!hasRecoverySession ? (
          <p className="rounded-2xl border border-[#efc5bc] bg-[#fff4f1] px-4 py-3 text-sm leading-6 text-[#7b3f31]">
            This page works only after opening a valid recovery link. If needed, request a new one.
          </p>
        ) : null}
        <PasswordUpdateForm action={updatePasswordAction} />
      </SurfaceCard>
    </div>
  );
}
