import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Log in"
        description="A simple sign-in flow will be added here once Supabase auth is connected."
      />

      <SurfaceCard className="space-y-4">
        <p className="text-sm leading-6 text-stone">
          This placeholder keeps the route and visual system ready for the first auth pass.
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:bg-rosewater"
          href="/signup"
        >
          Need an account?
        </Link>
      </SurfaceCard>
    </div>
  );
}
