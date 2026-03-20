import type {
  AppUserState,
  BodyEntryRecord,
  CycleHistoryItem,
  PeriodEntryRecord,
  ProfileRecord,
  WeightTrendPoint,
} from "@/types";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentUserContext() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    supabase,
    user,
    error,
  };
}

export function isOnboardingComplete(profile: ProfileRecord | null) {
  return Boolean(profile?.average_cycle_length && profile?.training_focus);
}

export async function getCurrentUserAppState(): Promise<AppUserState> {
  const { user } = await getCurrentUserContext();

  if (!user) {
    return {
      isAuthenticated: false,
      isOnboardingComplete: false,
      profile: null,
      userEmail: null,
      userId: null,
    };
  }

  const { data: profile } = await getProfile(user.id);

  return {
    isAuthenticated: true,
    isOnboardingComplete: isOnboardingComplete(profile),
    profile,
    userEmail: user.email ?? null,
    userId: user.id,
  };
}

export function getPostAuthPath(appState: AppUserState) {
  if (!appState.isAuthenticated) {
    return "/";
  }

  return appState.isOnboardingComplete ? "/dashboard" : "/onboarding";
}

export async function getProfile(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle<ProfileRecord>();

  return { data, error };
}

export async function getRecentBodyEntries(userId: string, limit = 5) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("body_entries")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<BodyEntryRecord[]>();

  return { data: data ?? [], error };
}

export async function getRecentPeriodEntries(userId: string, limit = 6) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("period_entries")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<PeriodEntryRecord[]>();

  return { data: data ?? [], error };
}

export function buildCycleHistory(entries: PeriodEntryRecord[]): CycleHistoryItem[] {
  const orderedEntries = [...entries].sort((left, right) =>
    left.start_date < right.start_date ? 1 : -1,
  );

  return orderedEntries.map((entry, index) => {
    const previousEntry = orderedEntries[index + 1];
    const cycleLengthDays = previousEntry
      ? Math.round(
          (new Date(entry.start_date).getTime() - new Date(previousEntry.start_date).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : null;

    return {
      id: entry.id,
      startDate: entry.start_date,
      previousStartDate: previousEntry?.start_date ?? null,
      cycleLengthDays,
    };
  });
}

const sampleWeightTrend: WeightTrendPoint[] = [
  { date: "2025-01-10", value: 67.8, isSample: true },
  { date: "2025-01-18", value: 67.4, isSample: true },
  { date: "2025-01-29", value: 67.1, isSample: true },
  { date: "2025-02-09", value: 66.9, isSample: true },
  { date: "2025-02-20", value: 66.7, isSample: true },
  { date: "2025-03-03", value: 66.8, isSample: true },
];

export function buildWeightTrend(entries: BodyEntryRecord[]): {
  points: WeightTrendPoint[];
  isSample: boolean;
} {
  const points = [...entries]
    .filter((entry) => entry.weight !== null)
    .sort((left, right) => (left.date > right.date ? 1 : -1))
    .map((entry) => ({
      date: entry.date,
      value: Number(entry.weight),
    }));

  if (points.length >= 2) {
    return {
      points,
      isSample: false,
    };
  }

  return {
    points: sampleWeightTrend,
    isSample: true,
  };
}
