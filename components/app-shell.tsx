import Link from "next/link";
import type { ReactNode } from "react";

import { LogoutButton } from "@/components/logout-button";
import { appLinks, authLinks } from "@/lib/site";
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

  const visibleLinks = userEmail ? appLinks : authLinks;

  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="mx-auto flex min-h-screen max-w-app flex-col px-5 pb-12 pt-5 sm:px-6">
        <header className="mb-10 border-b border-line/80 pb-4">
          <div className="flex items-center justify-between gap-4">
            <Link className="text-lg font-semibold tracking-tight" href="/">
              Vela
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-sm text-stone">
              {visibleLinks.map((link) => (
                <Link
                  key={link.href}
                  className="px-1 py-1 transition hover:text-ink"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
              {userEmail ? (
                <span className="hidden text-xs text-pine sm:inline">
                  {userEmail}
                </span>
              ) : null}
              {userEmail ? <LogoutButton /> : null}
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
