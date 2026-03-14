import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Sign up"
        description="Account creation will start here once authentication is wired in."
      />

      <SurfaceCard className="space-y-4">
        <p className="text-sm leading-6 text-stone">
          For now, this route is a clean placeholder so the initial app flow is already mapped.
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:bg-rosewater"
          href="/login"
        >
          Already have an account?
        </Link>
      </SurfaceCard>
    </div>
  );
}
