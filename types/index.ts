export type NavLink = {
  href: string;
  label: string;
};

export type DashboardCard = {
  title: string;
  body: string;
};

export type TrainingFocus = "crossfit" | "running" | "both";

export type TrainingFocusOption = {
  value: TrainingFocus;
  label: string;
  description: string;
};

export type MetricField = {
  key:
    | "weight"
    | "waist"
    | "hips"
    | "bust"
    | "thigh"
    | "arm"
    | "neck"
    | "bodyFatPercentage";
  label: string;
};

export type OnboardingDraft = {
  averageCycleLength: string;
  trainingFocus: TrainingFocus;
};

export type AuthActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};
