import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/app-shell";
import { getCurrentUserAppState } from "@/lib/supabase/data";

import "./globals.css";

export const metadata: Metadata = {
  title: "Vela",
  description: "A minimal cycle-aware training companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const appStatePromise = getCurrentUserAppState();

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppShellFromState appStatePromise={appStatePromise}>{children}</AppShellFromState>
      </body>
    </html>
  );
}

async function AppShellFromState({
  appStatePromise,
  children,
}: {
  appStatePromise: ReturnType<typeof getCurrentUserAppState>;
  children: ReactNode;
}) {
  const appState = await appStatePromise;

  return (
    <AppShell
      isAuthenticated={appState.isAuthenticated}
      isOnboardingComplete={appState.isOnboardingComplete}
      userEmail={appState.userEmail}
    >
      {children}
    </AppShell>
  );
}
