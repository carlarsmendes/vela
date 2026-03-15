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

export type ProfileRecord = {
  user_id: string;
  average_cycle_length: number | null;
  training_focus: TrainingFocus | null;
  created_at: string;
  updated_at: string;
};

export type BodyEntryRecord = {
  id: string;
  user_id: string;
  date: string;
  weight: number | null;
  waist: number | null;
  hips: number | null;
  bust: number | null;
  thigh: number | null;
  arm: number | null;
  neck: number | null;
  body_fat_percentage: number | null;
  note: string | null;
  created_at: string;
};

export type FormActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};
