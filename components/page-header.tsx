type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-pine">{eyebrow}</p>
      ) : null}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
        <p className="max-w-md text-sm leading-6 text-stone">{description}</p>
      </div>
    </div>
  );
}
