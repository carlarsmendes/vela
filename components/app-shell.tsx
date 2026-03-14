import Link from "next/link";
import type { ReactNode } from "react";

import { navLinks } from "@/lib/site";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="mx-auto flex min-h-screen max-w-app flex-col px-5 pb-12 pt-6 sm:px-6">
        <header className="mb-8 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Link className="text-lg font-semibold tracking-tight" href="/">
              Vela
            </Link>
            <span className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-pine">
              V1
            </span>
          </div>
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 text-sm text-stone">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="rounded-full px-3 py-1.5 transition hover:bg-rosewater hover:text-ink"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
