import Link from "next/link";

import { SurfaceCard } from "@/components/surface-card";

const valuePoints = [
  "Track body metrics and period starts with less noise.",
  "Keep a simple rhythm for training, recovery, and cycle context.",
  "Build a clearer picture over time without turning tracking into admin.",
];

const supportPoints = [
  "Cycle-aware, not clinical",
  "Calm structure, mobile-first",
  "Built for CrossFit, running, or both",
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(238,243,240,0.9))] px-5 py-6 shadow-card">
        <div className="absolute -right-12 top-0 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(82,99,92,0.2),transparent_70%)]" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(181,157,117,0.18),transparent_70%)]" />

        <div className="relative space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-pine">Vela</p>
            <div className="space-y-3">
              <h1 className="max-w-sm text-4xl font-semibold tracking-tight text-ink">
                A more elegant way to track your cycle and training.
              </h1>
              <p className="max-w-md text-base leading-7 text-stone">
                Vela brings cycle timing, body metrics, and training context into one clean place,
                so you can keep a useful record without the usual clutter.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              href="/signup"
            >
              Create account
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-pine/20 bg-white/80 px-5 py-3 text-sm font-medium text-ink transition hover:bg-white"
              href="/login"
            >
              Log in
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-[#e8efe9] px-5 py-3 text-sm font-medium text-pine transition hover:bg-[#dde7df]"
              href="/onboarding"
            >
              Preview onboarding
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {supportPoints.map((point) => (
              <span
                key={point}
                className="rounded-full border border-white/80 bg-white/65 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-stone"
              >
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4">
        <SurfaceCard className="space-y-4 border-pine/10 bg-white/90">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-pine">Why it feels lighter</p>
            <p className="text-sm leading-6 text-stone">
              Vela is designed to be supportive and practical. It gives your cycle and training
              context room to connect, without making every interaction feel like data entry.
            </p>
          </div>

          <div className="grid gap-3">
            {valuePoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-line/80 bg-[linear-gradient(145deg,#ffffff,#f4f1ec)] px-4 py-4"
              >
                <p className="text-sm leading-6 text-stone">{point}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-3 border-[#d8d7cb] bg-[linear-gradient(145deg,rgba(248,246,240,0.95),rgba(255,255,255,0.88))]">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-pine">What you can do now</p>
          <div className="grid gap-3 text-sm leading-6 text-stone">
            <div className="rounded-2xl bg-white/75 px-4 py-3">
              Create an account or log in
            </div>
            <div className="rounded-2xl bg-white/75 px-4 py-3">
              Save your average cycle length and training focus
            </div>
            <div className="rounded-2xl bg-white/75 px-4 py-3">
              Log body metrics and period starts from the dashboard
            </div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}
