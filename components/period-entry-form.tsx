"use client";

import { useActionState } from "react";

import { SubmitButton } from "@/components/submit-button";
import type { FormActionState } from "@/types";

type PeriodEntryFormProps = {
  action: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
  defaultDate: string;
};

const initialState: FormActionState = {
  status: "idle",
};

export function PeriodEntryForm({ action, defaultDate }: PeriodEntryFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-ink" htmlFor="period-start-date">
          Period start date
        </label>
        <input
          className="w-full rounded-2xl border border-line bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-pine focus:bg-white"
          defaultValue={defaultDate}
          id="period-start-date"
          name="startDate"
          type="date"
        />
      </div>

      <p className="text-sm leading-6 text-stone">
        Log the first day of bleeding. This gives Vela the anchor it needs for future cycle timing.
      </p>

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

      <SubmitButton idleLabel="Save period start" pendingLabel="Saving..." />
    </form>
  );
}
