"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";

import { SubmitButton } from "@/components/submit-button";
import { metricFields } from "@/lib/site";
import type { BodyEntryRecord } from "@/types";
import type { FormActionState } from "@/types";

type BodyEntryFormProps = {
  action: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
  defaultDate: string;
  initialEntry?: BodyEntryRecord | null;
  pendingLabel?: string;
  submitLabel?: string;
  extraFields?: ReactNode;
};

export const defaultFormState: FormActionState = {
  status: "idle",
};

export function BodyEntryForm({
  action,
  defaultDate,
  extraFields,
  initialEntry,
  pendingLabel = "Saving entry...",
  submitLabel = "Save body entry",
}: BodyEntryFormProps) {
  const [state, formAction] = useActionState(action, defaultFormState);

  return (
    <form action={formAction} className="space-y-6">
      {extraFields}
      <div className="space-y-2">
        <label className="text-sm font-medium text-ink" htmlFor="entry-date">
          Date
        </label>
        <input
          className="w-full rounded-2xl border border-line bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-pine focus:bg-white"
          defaultValue={initialEntry?.date ?? defaultDate}
          id="entry-date"
          name="date"
          type="date"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metricFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium text-ink" htmlFor={field.key}>
              {field.label}
            </label>
            <input
              className="w-full rounded-2xl border border-line bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-pine focus:bg-white"
              id={field.key}
              inputMode="decimal"
              name={field.key}
              placeholder="Optional"
              step="0.1"
              type="number"
              defaultValue={
                field.key === "bodyFatPercentage"
                  ? initialEntry?.body_fat_percentage ?? ""
                  : (initialEntry?.[
                      field.key as keyof Pick<
                        BodyEntryRecord,
                        "weight" | "waist" | "hips" | "bust" | "thigh" | "arm" | "neck"
                      >
                    ] ?? "")
              }
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-ink" htmlFor="entry-note">
          Note
        </label>
        <textarea
          className="min-h-28 w-full rounded-2xl border border-line bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-pine focus:bg-white"
          id="entry-note"
          name="note"
          placeholder="Optional context for this entry"
          defaultValue={initialEntry?.note ?? ""}
        />
      </div>

      <p className="text-sm leading-6 text-stone">
        Date is required. Add at least one metric. Weight can be logged more often, while
        measurements can stay weekly or every few weeks.
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

      <SubmitButton idleLabel={submitLabel} pendingLabel={pendingLabel} />
    </form>
  );
}
