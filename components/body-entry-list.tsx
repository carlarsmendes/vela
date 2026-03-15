"use client";

import { useActionState, useState } from "react";

import { BodyEntryForm, defaultFormState } from "@/components/body-entry-form";
import { SubmitButton } from "@/components/submit-button";
import type { BodyEntryRecord, FormActionState } from "@/types";

type BodyEntryListProps = {
  entries: BodyEntryRecord[];
  updateAction: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
  deleteAction: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
};

const fieldOrder: Array<keyof Pick<
  BodyEntryRecord,
  "weight" | "waist" | "hips" | "bust" | "thigh" | "arm" | "neck" | "body_fat_percentage"
>> = ["weight", "waist", "hips", "bust", "thigh", "arm", "neck", "body_fat_percentage"];

const fieldLabels: Record<(typeof fieldOrder)[number], string> = {
  weight: "Weight",
  waist: "Waist",
  hips: "Hips",
  bust: "Bust / chest",
  thigh: "Thigh",
  arm: "Arm",
  neck: "Neck",
  body_fat_percentage: "Body fat %",
};

function DeleteEntryForm({
  action,
  entryId,
}: {
  action: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
  entryId: string;
}) {
  const [state, formAction] = useActionState(action, defaultFormState);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this body entry? This cannot be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <input name="entryId" type="hidden" value={entryId} />
      <div className="space-y-2">
        <SubmitButton idleLabel="Delete" pendingLabel="Deleting..." />
        {state.message ? (
          <p
            className={`text-sm leading-6 ${
              state.status === "error" ? "text-[#7b3f31]" : "text-pine"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export function BodyEntryList({ entries, updateAction, deleteAction }: BodyEntryListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (entries.length === 0) {
    return (
      <p className="text-sm leading-6 text-stone">
        No body entries yet. Your recent metrics will appear here once you save the first one.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const visibleMetrics = fieldOrder.filter((field) => entry[field] !== null);
        const isEditing = editingId === entry.id;

        return (
          <div key={entry.id} className="rounded-2xl border border-line bg-sand p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-ink">{entry.date}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs uppercase tracking-[0.18em] text-pine">Body entry</p>
                <button
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-stone transition hover:text-ink"
                  onClick={() => setEditingId(isEditing ? null : entry.id)}
                  type="button"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <BodyEntryForm
                  action={updateAction}
                  defaultDate={entry.date}
                  extraFields={<input name="entryId" type="hidden" value={entry.id} />}
                  initialEntry={entry}
                  pendingLabel="Updating..."
                  submitLabel="Update entry"
                />
                <DeleteEntryForm action={deleteAction} entryId={entry.id} />
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {visibleMetrics.map((field) => (
                    <span
                      key={field}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-stone"
                    >
                      {fieldLabels[field]}: {entry[field]}
                    </span>
                  ))}
                </div>

                {entry.note ? (
                  <p className="mt-3 text-sm leading-6 text-stone">{entry.note}</p>
                ) : null}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
