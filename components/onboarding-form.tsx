"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { SubmitButton } from "@/components/submit-button";
import { metricFields, trainingFocusOptions } from "@/lib/site";
import type { FormActionState, OnboardingDraft, TrainingFocus } from "@/types";

type OnboardingFormProps = {
  action: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
  initialDraft: OnboardingDraft;
};

const initialState: FormActionState = {
  status: "idle",
};

export function OnboardingForm({ action, initialDraft }: OnboardingFormProps) {
  const [draft, setDraft] = useState<OnboardingDraft>(initialDraft);
  const [state, formAction] = useActionState(action, initialState);

  function updateTrainingFocus(trainingFocus: TrainingFocus) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      trainingFocus,
    }));
  }

  function updateAverageCycleLength(averageCycleLength: string) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      averageCycleLength,
    }));
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-ink" htmlFor="averageCycleLength">
          Average cycle length
        </label>
        <input
          className="w-full rounded-2xl border border-line bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-pine focus:bg-white"
          id="averageCycleLength"
          inputMode="numeric"
          name="averageCycleLength"
          onChange={(event) => updateAverageCycleLength(event.target.value)}
          placeholder="28"
          type="number"
          value={draft.averageCycleLength}
        />
        <input name="trainingFocus" type="hidden" value={draft.trainingFocus} />
        <p className="text-sm leading-6 text-stone">
          If you know your average, you can enter it here. If not, you can start with 28 and
          update it later.
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight text-ink">Preferred training focus</h2>
          <p className="text-sm leading-6 text-stone">
            Choose the direction you want Vela to keep in mind first.
          </p>
        </div>

        <div className="grid gap-3">
          {trainingFocusOptions.map((option) => {
            const isActive = draft.trainingFocus === option.value;

            return (
              <button
                aria-pressed={isActive}
                key={option.value}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-pine bg-[#f4fbf6]"
                    : "border-line bg-white hover:bg-rosewater"
                }`}
                onClick={() => updateTrainingFocus(option.value)}
                type="button"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-ink">{option.label}</p>
                  <p className="text-sm leading-6 text-stone">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

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

      {state.message ? (
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            state.status === "error"
              ? "border border-[#efc5bc] bg-[#fff4f1] text-[#7b3f31]"
              : "border border-[#d8e6dd] bg-[#f4fbf6] text-pine"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div className="space-y-3">
        <SubmitButton idleLabel="Save and continue" pendingLabel="Saving..." />
        <Link
          className="inline-flex text-sm font-medium text-stone transition hover:text-ink"
          href="/dashboard"
        >
          Skip to dashboard placeholder
        </Link>
      </div>
    </form>
  );
}
