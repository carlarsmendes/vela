"use client";

import { useActionState, useState } from "react";

import { defaultPeriodFormState, PeriodEntryForm } from "@/components/period-entry-form";
import { SubmitButton } from "@/components/submit-button";
import type { CycleHistoryItem, FormActionState, PeriodEntryRecord } from "@/types";

type CycleHistoryListProps = {
  history: CycleHistoryItem[];
  periodEntries: PeriodEntryRecord[];
  updateAction: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
  deleteAction: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
};

function DeletePeriodEntryForm({
  action,
  entryId,
}: {
  action: (
    state: FormActionState,
    formData: FormData,
  ) => Promise<FormActionState>;
  entryId: string;
}) {
  const [state, formAction] = useActionState(action, defaultPeriodFormState);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this period start? This cannot be undone.")) {
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

export function CycleHistoryList({
  history,
  periodEntries,
  updateAction,
  deleteAction,
}: CycleHistoryListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (periodEntries.length === 0) {
    return (
      <p className="text-sm leading-6 text-stone">
        No period starts yet. Once you log them, your recent cycle history will build here.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((item) => {
        const entry = periodEntries.find((periodEntry) => periodEntry.id === item.id);
        const isEditing = editingId === item.id;

        if (!entry) {
          return null;
        }

        return (
          <div key={item.id} className="border border-line bg-sand p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-ink">{item.startDate}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs uppercase tracking-[0.18em] text-pine">Logged start</p>
                <button
                  className="border border-line bg-white px-3 py-1.5 text-xs font-medium text-stone transition hover:text-ink"
                  onClick={() => setEditingId(isEditing ? null : item.id)}
                  type="button"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>

            {isEditing ? (
              <div className="mt-4 space-y-4">
                <PeriodEntryForm
                  action={updateAction}
                  defaultDate={entry.start_date}
                  extraFields={<input name="entryId" type="hidden" value={entry.id} />}
                  initialEntry={entry}
                  pendingLabel="Updating..."
                  submitLabel="Update period start"
                />
                <DeletePeriodEntryForm action={deleteAction} entryId={entry.id} />
              </div>
            ) : (
              <div className="mt-3 space-y-1 text-sm leading-6 text-stone">
                <p>Previous start: {item.previousStartDate ?? "Need another logged start"}</p>
                <p>
                  Days between starts:{" "}
                  {item.cycleLengthDays !== null
                    ? `${item.cycleLengthDays} days`
                    : "Need another logged start"}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
