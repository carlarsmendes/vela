import { PageHeader } from "@/components/page-header";
import { SurfaceCard } from "@/components/surface-card";

export default function OnboardingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Onboarding"
        title="Start with your average cycle length"
        description="This helps Vela begin with a baseline you can refine later as you log more data."
      />

      <SurfaceCard>
        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink" htmlFor="cycle-length">
              Average cycle length
            </label>
            <input
              className="w-full rounded-2xl border border-line bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-pine focus:bg-white"
              id="cycle-length"
              inputMode="numeric"
              name="cycle-length"
              placeholder="28"
              type="number"
            />
          </div>

          <p className="text-sm leading-6 text-stone">
            If you know your average, you can enter it here. If not, you can start with 28 and
            update it later.
          </p>

          <button
            className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            type="button"
          >
            Continue
          </button>
        </form>
      </SurfaceCard>
    </div>
  );
}
