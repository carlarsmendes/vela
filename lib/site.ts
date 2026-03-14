import type { DashboardCard, NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { href: "/login", label: "Log in" },
  { href: "/signup", label: "Sign up" },
];

export const dashboardCards: DashboardCard[] = [
  {
    title: "Cycle overview",
    body: "Your recent cycle summary will live here once tracking starts.",
  },
  {
    title: "Body metrics",
    body: "A simple space for the body data you choose to log over time.",
  },
  {
    title: "Training guidance",
    body: "Future training notes and suggestions will build from your own patterns.",
  },
];
