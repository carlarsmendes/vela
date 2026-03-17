"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { LogoutButton } from "@/components/logout-button";
import { appLinks, authLinks } from "@/lib/site";

type AppShellProps = {
  children: ReactNode;
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  userEmail: string | null;
};

const publicPaths = new Set(["/", "/login", "/signup", "/forgot-password", "/reset-password"]);

export function AppShell({
  children,
  isAuthenticated,
  isOnboardingComplete,
  userEmail,
}: AppShellProps) {
  const pathname = usePathname();
  const isOnboardingRoute = pathname === "/onboarding";
  const isPublicRoute = publicPaths.has(pathname) || pathname.startsWith("/auth/");
  const showPublicHeader = !isAuthenticated || isPublicRoute;
  const showAppNav = isAuthenticated && isOnboardingComplete && !isPublicRoute && !isOnboardingRoute;
  const visibleLinks = showPublicHeader ? authLinks : showAppNav ? appLinks : [];

  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="mx-auto flex min-h-screen max-w-app flex-col px-5 pb-20 pt-5 sm:px-6">
        <header className="mb-8 border-b border-line/80 pb-4">
          <div className="flex items-center justify-between gap-4">
            <Link className="text-lg font-semibold tracking-tight" href="/">
              Vela
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-sm text-stone">
              {visibleLinks.map((link) => (
                <Link
                  key={link.href}
                  className={`px-1 py-1 transition hover:text-ink ${
                    pathname === link.href ? "text-ink" : ""
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && !showPublicHeader && userEmail ? (
                <span className="hidden text-xs text-pine sm:inline">
                  {userEmail}
                </span>
              ) : null}
              {isAuthenticated ? <LogoutButton /> : null}
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        {showAppNav ? (
          <nav
            aria-label="App"
            className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-app border-t border-line bg-[#f3efe9]/96 px-5 py-3 backdrop-blur-sm sm:px-6"
          >
            {appLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  className={`flex-1 border-t-2 pt-2 text-center text-sm font-medium transition ${
                    isActive ? "border-pine text-ink" : "border-transparent text-stone hover:text-ink"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
