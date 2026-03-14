import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";

export default function AuthErrorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Auth"
        title="We could not complete that sign-in step"
        description="This usually means the auth callback or redirect settings still need to be finished."
      />

      <SurfaceCard className="space-y-4">
        <p className="text-sm leading-6 text-stone">
          Return to sign up or log in after your Supabase project settings are in place.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            href="/signup"
          >
            Back to sign up
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-rosewater"
            href="/login"
          >
            Back to log in
          </Link>
        </div>
      </SurfaceCard>
    </div>
  );
}
