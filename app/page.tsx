import Link from "next/link";

const productBlocks = [
  {
    title: "Cycle tracking",
    body: "Log period starts and understand your cycle timing.",
  },
  {
    title: "Body metrics",
    body: "Track weight and body measurements with simple trends.",
  },
  {
    title: "Training context",
    body: "See your cycle and body data together to guide training decisions.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-14 pb-4">
      <section className="space-y-8 border-b border-line/80 pb-10">
        <div className="space-y-5">
          <h1 className="max-w-md text-[2.6rem] font-semibold leading-tight tracking-tight text-ink">
            Track your cycle and training with clarity.
          </h1>
          <p className="max-w-md text-base leading-7 text-stone">
            Vela is a calm place to keep your cycle timing, body metrics, and training context
            together. Structured enough to be useful, quiet enough to return to often.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center border border-ink bg-ink px-5 py-3 text-sm font-medium text-mist transition hover:opacity-92"
            href="/signup"
          >
            Create account
          </Link>
          <Link
            className="inline-flex items-center justify-center border border-line bg-transparent px-5 py-3 text-sm font-medium text-ink transition hover:border-stone"
            href="/login"
          >
            Log in
          </Link>
          <Link
            className="inline-flex items-center justify-center px-1 py-3 text-sm font-medium text-pine transition hover:text-ink"
            href="/onboarding"
          >
            Preview onboarding
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-pine">Product</p>
          <p className="max-w-md text-sm leading-6 text-stone">
            Vela is designed as a personal logbook for the patterns that shape training over time.
          </p>
        </div>

        <div className="border-y border-line/80">
          {productBlocks.map((block, index) => (
            <div
              key={block.title}
              className={`space-y-2 px-1 py-5 ${index !== productBlocks.length - 1 ? "border-b border-line/80" : ""}`}
            >
              <h2 className="text-lg font-semibold tracking-tight text-ink">{block.title}</h2>
              <p className="max-w-sm text-sm leading-6 text-stone">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-pine">Preview</p>
          <p className="max-w-md text-sm leading-6 text-stone">
            A simple view of where cycle timing, body metrics, and training context can come
            together.
          </p>
        </div>

        <div className="border border-line/90 bg-[#f6f2ec]">
          <div className="border-b border-line/90 px-4 py-3">
            <p className="text-sm font-medium text-ink">Dashboard preview</p>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            <div className="space-y-1 border-b border-line/80 px-4 py-4 sm:border-b-0 sm:border-r">
              <p className="text-xs uppercase tracking-[0.16em] text-pine">Cycle day</p>
              <p className="text-2xl font-semibold tracking-tight text-ink">Day 14</p>
            </div>
            <div className="space-y-1 border-b border-line/80 px-4 py-4 sm:border-b-0">
              <p className="text-xs uppercase tracking-[0.16em] text-pine">Predicted next period</p>
              <p className="text-base font-medium text-ink">Around April 18</p>
            </div>
            <div className="space-y-1 border-b border-line/80 px-4 py-4 sm:border-b-0 sm:border-r sm:border-t">
              <p className="text-xs uppercase tracking-[0.16em] text-pine">Body metrics trends</p>
              <p className="text-base font-medium text-ink">Weight and measurements over time</p>
            </div>
            <div className="space-y-1 px-4 py-4 sm:border-t">
              <p className="text-xs uppercase tracking-[0.16em] text-pine">Training focus</p>
              <p className="text-base font-medium text-ink">Running + strength</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
