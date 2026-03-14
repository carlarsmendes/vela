"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SubmitButton } from "@/components/submit-button";
import { initialOnboardingDraft, ONBOARDING_STORAGE_KEY } from "@/lib/onboarding-storage";
import { metricFields, trainingFocusOptions } from "@/lib/site";
import type { OnboardingDraft, TrainingFocus } from "@/types";

export function OnboardingForm() {
  const [draft, setDraft] = useState<OnboardingDraft>(initialOnboardingDraft);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);

    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue) as Partial<OnboardingDraft>;
        const nextDraft: OnboardingDraft = {
          averageCycleLength:
            typeof parsedValue.averageCycleLength === "string"
              ? parsedValue.averageCycleLength
              : initialOnboardingDraft.averageCycleLength,
          trainingFocus:
            parsedValue.trainingFocus === "crossfit" ||
            parsedValue.trainingFocus === "running" ||
            parsedValue.trainingFocus === "both"
              ? parsedValue.trainingFocus
              : initialOnboardingDraft.trainingFocus,
        };

        const timeoutId = window.setTimeout(() => {
          setDraft(nextDraft);
          setIsLoaded(true);
        }, 0);

        return () => window.clearTimeout(timeoutId);
      } catch {
        window.localStorage.removeItem(ONBOARDING_STORAGE_KEY);
      }
    }

    const timeoutId = window.setTimeout(() => {
      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function updateTrainingFocus(trainingFocus: TrainingFocus) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      trainingFocus,
    }));
    setIsSaved(false);
  }

  function updateAverageCycleLength(averageCycleLength: string) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      averageCycleLength,
    }));
    setIsSaved(false);
  }

  function handleSubmit(formData: FormData) {
    const averageCycleLength = formData.get("averageCycleLength");

    const nextDraft: OnboardingDraft = {
      averageCycleLength:
        typeof averageCycleLength === "string" && averageCycleLength.trim().length > 0
          ? averageCycleLength.trim()
          : "28",
      trainingFocus: draft.trainingFocus,
    };

    setDraft(nextDraft);
    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(nextDraft));
    setIsSaved(true);

    // TODO: Replace local storage with a Supabase-backed onboarding/profile save
    // once auth and the user profile table are in place.
  }

  return (
    <form action={handleSubmit} className="space-y-6">
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
            time.
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
      </div>

      {isSaved ? (
        <div className="rounded-2xl border border-[#d8e6dd] bg-[#f4fbf6] px-4 py-3 text-sm leading-6 text-pine">
          Onboarding draft saved on this device for now.
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

      {!isLoaded ? (
        <p className="text-sm leading-6 text-stone">Loading your saved onboarding draft...</p>
      ) : null}
    </form>
  );
}
