import type { BodyEntryRecord, ProfileRecord } from "@/types";

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
