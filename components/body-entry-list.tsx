import type { BodyEntryRecord } from "@/types";

type BodyEntryListProps = {
  entries: BodyEntryRecord[];
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

export function BodyEntryList({ entries }: BodyEntryListProps) {
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

        return (
          <div key={entry.id} className="rounded-2xl border border-line bg-sand p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-ink">{entry.date}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-pine">Body entry</p>
            </div>

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

            {entry.note ? <p className="mt-3 text-sm leading-6 text-stone">{entry.note}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
