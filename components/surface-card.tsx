import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SurfaceCardProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
};

export function SurfaceCard({ children, className = "", ...props }: SurfaceCardProps) {
  return (
    <section
      {...props}
      className={`rounded-lg border border-line/90 bg-bone/95 p-5 shadow-panel ${className}`.trim()}
    >
      {children}
    </section>
  );
}
