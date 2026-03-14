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
        <header className="mb-8 flex items-center justify-between">
          <Link className="text-lg font-semibold tracking-tight" href="/">
            Vela
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-3 text-sm text-stone">
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
