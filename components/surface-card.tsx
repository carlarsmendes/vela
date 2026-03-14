import type { ReactNode } from "react";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
};

export function SurfaceCard({ children, className = "" }: SurfaceCardProps) {
  return (
    <section
      className={`rounded-3xl border border-line bg-white/90 p-5 shadow-card backdrop-blur ${className}`.trim()}
    >
      {children}
    </section>
  );
}
