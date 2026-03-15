import Link from "next/link";
import type { ReactNode } from "react";

import { LogoutButton } from "@/components/logout-button";
import { navLinks } from "@/lib/site";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AppShellProps = {
  children: ReactNode;
};

export async function AppShell({ children }: AppShellProps) {
  let userEmail: string | null = null;

  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    userEmail = user?.email ?? null;
  }

  const visibleLinks = userEmail
    ? navLinks.filter((link) => link.href !== "/login" && link.href !== "/signup")
    : navLinks;

  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="mx-auto flex min-h-screen max-w-app flex-col px-5 pb-12 pt-6 sm:px-6">
        <header className="mb-8 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Link className="text-lg font-semibold tracking-tight" href="/">
              Vela
            </Link>
            <span className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-pine">
              Vela
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 text-sm text-stone">
              {visibleLinks.map((link) => (
                <Link
                  key={link.href}
                  className="rounded-full px-3 py-1.5 transition hover:bg-rosewater hover:text-ink"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {userEmail ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-medium text-pine">
                  Logged in{userEmail ? ` as ${userEmail}` : ""}
                </span>
                <LogoutButton />
              </div>
            ) : null}
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
