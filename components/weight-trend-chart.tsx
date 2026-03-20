import type { WeightTrendPoint } from "@/types";

type WeightTrendChartProps = {
  points: WeightTrendPoint[];
  isSample?: boolean;
};

function formatShortDate(value: string) {
  const date = new Date(value);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function WeightTrendChart({ points, isSample = false }: WeightTrendChartProps) {
  if (points.length < 2) {
    return (
      <div className="border border-dashed border-line bg-[#f8f3ed] px-4 py-8 text-sm leading-6 text-stone">
        Log at least two weight entries to start a real trend line.
      </div>
    );
  }

  const values = points.map((point) => point.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = Math.max(maxValue - minValue, 1);
  const width = 320;
  const height = 176;
  const xStep = width / Math.max(points.length - 1, 1);

  const coordinates = points.map((point, index) => {
    const x = index * xStep;
    const y = height - ((point.value - minValue) / range) * (height - 20) - 10;

    return { ...point, x, y };
  });

  const path = coordinates.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden border border-line bg-[#f7f1ea]">
        <div className="flex items-start justify-between border-b border-line/80 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-pine">Weight trend</p>
            <p className="mt-1 text-sm leading-6 text-stone">
              {isSample
                ? "Sample data is shown until there are enough logged weight entries."
                : "A simple view of your logged weight over time."}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-stone">Latest</p>
            <p className="text-lg font-semibold tracking-tight text-moss">
              {points[points.length - 1]?.value.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="px-3 py-4">
          <svg
            aria-label="Weight trend chart"
            className="h-44 w-full"
            preserveAspectRatio="none"
            viewBox={`0 0 ${width} ${height}`}
          >
            <defs>
              <linearGradient id="weight-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#54685a" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#54685a" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[0, 0.5, 1].map((step) => {
              const y = 10 + (height - 20) * step;

              return (
                <line
                  key={step}
                  stroke="#d8cbc1"
                  strokeDasharray="4 5"
                  strokeWidth="1"
                  x1="0"
                  x2={width}
                  y1={y}
                  y2={y}
                />
              );
            })}
            <path d={areaPath} fill="url(#weight-area)" />
            <path d={path} fill="none" stroke="#3f5646" strokeWidth="3" />
            {coordinates.map((point) => (
              <circle
                key={point.date}
                cx={point.x}
                cy={point.y}
                fill="#fcfaf7"
                r="4"
                stroke="#3f5646"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-line/80 px-4 py-3 text-xs text-stone">
          <div>
            <p className="uppercase tracking-[0.16em] text-pine">Start</p>
            <p className="mt-1 text-sm font-medium text-ink">{formatShortDate(points[0].date)}</p>
          </div>
          <div className="text-center">
            <p className="uppercase tracking-[0.16em] text-pine">Range</p>
            <p className="mt-1 text-sm font-medium text-ink">
              {minValue.toFixed(1)} to {maxValue.toFixed(1)}
            </p>
          </div>
          <div className="text-right">
            <p className="uppercase tracking-[0.16em] text-pine">Latest date</p>
            <p className="mt-1 text-sm font-medium text-ink">
              {formatShortDate(points[points.length - 1].date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
