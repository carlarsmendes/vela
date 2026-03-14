import type { DashboardCard, MetricField, NavLink, TrainingFocusOption } from "@/types";

export const navLinks: NavLink[] = [
  { href: "/onboarding", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Log in" },
  { href: "/signup", label: "Sign up" },
];

export const trainingFocusOptions: TrainingFocusOption[] = [
  {
    value: "crossfit",
    label: "CrossFit",
    description: "Track around strength, conditioning, and gym-based training.",
  },
  {
    value: "running",
    label: "Running",
    description: "Track around mileage, recovery, and consistency on the road or trail.",
  },
  {
    value: "both",
    label: "Both",
    description: "Keep space for both gym work and running without overcomplicating the start.",
  },
];

export const metricFields: MetricField[] = [
  { key: "weight", label: "Weight" },
  { key: "waist", label: "Waist" },
  { key: "hips", label: "Hips" },
  { key: "bust", label: "Bust / chest" },
  { key: "thigh", label: "Thigh" },
  { key: "arm", label: "Arm" },
  { key: "neck", label: "Neck" },
  { key: "bodyFatPercentage", label: "Body fat %" },
];

export const dashboardCards: DashboardCard[] = [
  {
    title: "Cycle overview",
    body: "A calm summary of recent cycle timing and the next expected phase will live here.",
  },
  {
    title: "Body metrics",
    body: "Weight can be logged more often, while measurements can stay on a weekly rhythm.",
  },
  {
    title: "Training focus",
    body: "CrossFit, running, or both will shape later guidance without taking over the app.",
  },
];
