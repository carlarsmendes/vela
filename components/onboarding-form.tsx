import Link from "next/link";

import { ProfileSettingsForm } from "@/components/profile-settings-form";
import { metricFields } from "@/lib/site";
import type { FormActionState, OnboardingDraft } from "@/types";

type OnboardingFormProps = {
  action: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
  initialDraft: OnboardingDraft;
};

export function OnboardingForm({ action, initialDraft }: OnboardingFormProps) {
  return (
    <div className="space-y-6">
      <ProfileSettingsForm
        action={action}
        initialDraft={initialDraft}
        redirectPath="/dashboard"
        submitLabel="Save and continue"
      />
      <div className="space-y-3 rounded-3xl border border-line bg-sand p-5">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight text-ink">Body metrics</h2>
          <p className="text-sm leading-6 text-stone">
            You will be able to log only what is useful to you, without filling every field each
            time. These measurements are added on the dashboard after onboarding is saved.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-2 text-sm leading-6 text-stone">
          {metricFields.map((metric) => (
            <li key={metric.key} className="rounded-2xl bg-white px-3 py-2">
              {metric.label}
            </li>
          ))}
        </ul>

        <p className="text-sm leading-6 text-stone">
          Weight may be logged more often. Measurements can stay on a weekly or every-few-weeks
          rhythm.
        </p>

        <Link
          className="inline-flex text-sm font-medium text-stone transition hover:text-ink"
          href="/dashboard"
        >
          Body metrics are logged on the dashboard
        </Link>
      </div>
    </div>
  );
}
