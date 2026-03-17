"use client";

import { useActionState, useState } from "react";

import { SubmitButton } from "@/components/submit-button";
import { trainingFocusOptions } from "@/lib/site";
import type { FormActionState, OnboardingDraft, TrainingFocus } from "@/types";

type ProfileSettingsFormProps = {
  action: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
  initialDraft: OnboardingDraft;
  submitLabel?: string;
  redirectPath?: string;
};

const initialState: FormActionState = {
  status: "idle",
};

export function ProfileSettingsForm({
  action,
  initialDraft,
  redirectPath,
  submitLabel = "Save profile",
}: ProfileSettingsFormProps) {
  const [draft, setDraft] = useState<OnboardingDraft>(initialDraft);
  const [state, formAction] = useActionState(action, initialState);

  function updateTrainingFocus(trainingFocus: TrainingFocus) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      trainingFocus,
    }));
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-ink" htmlFor="averageCycleLength">
          Average cycle length
        </label>
        <input
          className="w-full rounded-xl border border-line bg-[#f7f3ee] px-4 py-3 text-base text-ink outline-none transition focus:border-pine focus:bg-white"
          id="averageCycleLength"
          inputMode="numeric"
          name="averageCycleLength"
          onChange={(event) =>
            setDraft((currentDraft) => ({
              ...currentDraft,
              averageCycleLength: event.target.value,
            }))
          }
          placeholder="28"
          type="number"
          value={draft.averageCycleLength}
        />
        <p className="text-sm leading-6 text-stone">
          Update this whenever your logged history gives you a clearer average.
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight text-ink">Training focus</h2>
          <p className="text-sm leading-6 text-stone">
            This helps Vela keep future training context relevant to how you train.
          </p>
        </div>

        <div className="grid gap-3">
          {trainingFocusOptions.map((option) => {
            const isActive = draft.trainingFocus === option.value;

            return (
              <button
                aria-pressed={isActive}
                key={option.value}
                className={`border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-pine bg-[#eef3ef]"
                    : "border-line bg-transparent hover:border-stone/60"
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

      <input name="trainingFocus" type="hidden" value={draft.trainingFocus} />
      {redirectPath ? <input name="redirectPath" type="hidden" value={redirectPath} /> : null}

      {state.message ? (
        <div
          className={`px-4 py-3 text-sm leading-6 ${
            state.status === "error"
              ? "border border-[#efc5bc] bg-[#fff4f1] text-[#7b3f31]"
              : "border border-[#d8e6dd] bg-[#f4fbf6] text-pine"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <SubmitButton idleLabel={submitLabel} pendingLabel="Saving..." />
    </form>
  );
}
