import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";

const featurePoints = [
  "Set your average cycle length during onboarding.",
  "Log body metrics and period start dates in one place.",
  "Build toward useful timing patterns and light training guidance.",
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Vela"
        title="A clear starting point for cycle-aware training."
        description="Vela is designed to stay simple: calm structure, supportive tracking, and space to build useful patterns over time."
      />

      <SurfaceCard className="space-y-5">
        <div className="space-y-3">
          <p className="text-base leading-7 text-stone">
            Vela focuses on a calm starting point for onboarding, body metrics, and cycle tracking
            without adding clutter too early.
          </p>
          <ul className="space-y-3 text-sm leading-6 text-stone">
            {featurePoints.map((point) => (
              <li key={point} className="rounded-2xl bg-sand px-4 py-3">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            href="/signup"
          >
            Create account
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-rosewater"
            href="/login"
          >
            Log in
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-rosewater"
            href="/onboarding"
          >
            Preview onboarding
          </Link>
        </div>
      </SurfaceCard>

      <SurfaceCard className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-pine">Body metrics</p>
        <p className="text-sm leading-6 text-stone">
          Weight, waist, hips, bust or chest, thigh, arm, neck, body fat %, and an optional note
          are part of the Vela foundation.
        </p>
      </SurfaceCard>
    </div>
  );
}
