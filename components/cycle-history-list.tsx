import type { CycleHistoryItem, PeriodEntryRecord } from "@/types";

type CycleHistoryListProps = {
  history: CycleHistoryItem[];
  periodEntries: PeriodEntryRecord[];
};

export function CycleHistoryList({ history, periodEntries }: CycleHistoryListProps) {
  if (periodEntries.length === 0) {
    return (
      <p className="text-sm leading-6 text-stone">
        No period starts yet. Once you log them, Vela will show your recent cycle history here.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <div key={item.id} className="rounded-2xl border border-line bg-sand p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-ink">{item.startDate}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-pine">Period start</p>
          </div>

          <div className="mt-3 space-y-1 text-sm leading-6 text-stone">
            <p>Previous start: {item.previousStartDate ?? "Not enough history yet"}</p>
            <p>
              Cycle length:{" "}
              {item.cycleLengthDays !== null ? `${item.cycleLengthDays} days` : "Needs another entry"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
