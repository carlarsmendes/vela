import { loginAction } from "@/app/auth-actions";
import { AuthForm } from "@/components/auth-form";
import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Log in"
        description="Use your email and password once your Supabase project is connected."
      />

      <SurfaceCard>
        <AuthForm
          action={loginAction}
          alternateHref="/signup"
          alternateLabel="Need an account?"
          description="This is the first auth structure. It is ready for Supabase credentials and basic email/password testing."
          mode="login"
        />
      </SurfaceCard>
    </div>
  );
}
