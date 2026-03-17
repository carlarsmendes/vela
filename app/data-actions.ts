"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseOptionalNumber, parseRequiredString } from "@/lib/forms";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FormActionState, TrainingFocus } from "@/types";

const defaultFormState: FormActionState = {
  status: "idle",
};

function isTrainingFocus(value: string): value is TrainingFocus {
  return value === "crossfit" || value === "running" || value === "both";
}

export async function saveOnboardingAction(
  previousState: FormActionState = defaultFormState,
  formData: FormData,
): Promise<FormActionState> {
  void previousState;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const averageCycleLengthValue = parseRequiredString(formData.get("averageCycleLength"));
  const trainingFocusValue = parseRequiredString(formData.get("trainingFocus"));
  const redirectPath = parseRequiredString(formData.get("redirectPath"));
  const averageCycleLength = Number(averageCycleLengthValue);

  if (!averageCycleLengthValue || !Number.isFinite(averageCycleLength) || averageCycleLength < 10) {
    return {
      status: "error",
      message: "Enter a cycle length to save your starting point.",
    };
  }

  if (!isTrainingFocus(trainingFocusValue)) {
    return {
      status: "error",
      message: "Choose the training focus you want to start with.",
    };
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      average_cycle_length: averageCycleLength,
      training_focus: trainingFocusValue,
    },
    {
      onConflict: "user_id",
    },
  );

  if (error) {
    return {
      status: "error",
      message:
        error.code === "42P01"
          ? "Run the SQL setup in Supabase before saving onboarding."
          : error.message,
    };
  }

  revalidatePath("/onboarding");
  revalidatePath("/dashboard");
  revalidatePath("/profile");

  if (redirectPath) {
    redirect(redirectPath);
  }

  return {
    status: "success",
    message: "Your details have been saved.",
  };
}

export async function createBodyEntryAction(
  previousState: FormActionState = defaultFormState,
  formData: FormData,
): Promise<FormActionState> {
  void previousState;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const date = parseRequiredString(formData.get("date"));
  const weight = parseOptionalNumber(formData.get("weight"));
  const waist = parseOptionalNumber(formData.get("waist"));
  const hips = parseOptionalNumber(formData.get("hips"));
  const bust = parseOptionalNumber(formData.get("bust"));
  const thigh = parseOptionalNumber(formData.get("thigh"));
  const arm = parseOptionalNumber(formData.get("arm"));
  const neck = parseOptionalNumber(formData.get("neck"));
  const bodyFatPercentage = parseOptionalNumber(formData.get("bodyFatPercentage"));
  const note = parseRequiredString(formData.get("note"));

  if (!date) {
    return {
      status: "error",
      message: "Choose the date for this entry.",
    };
  }

  const hasAnyMetric = [
    weight,
    waist,
    hips,
    bust,
    thigh,
    arm,
    neck,
    bodyFatPercentage,
  ].some((value) => value !== null);

  if (!hasAnyMetric) {
    return {
      status: "error",
      message: "Add at least one metric before saving.",
    };
  }

  const { error } = await supabase.from("body_entries").insert({
    user_id: user.id,
    date,
    weight,
    waist,
    hips,
    bust,
    thigh,
    arm,
    neck,
    body_fat_percentage: bodyFatPercentage,
    note: note || null,
  });

  if (error) {
    return {
      status: "error",
      message:
        error.code === "42P01"
          ? "Run the SQL setup in Supabase before saving body entries."
          : error.message,
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Body entry saved.",
  };
}

export async function updateBodyEntryAction(
  previousState: FormActionState = defaultFormState,
  formData: FormData,
): Promise<FormActionState> {
  void previousState;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const entryId = parseRequiredString(formData.get("entryId"));
  const date = parseRequiredString(formData.get("date"));
  const weight = parseOptionalNumber(formData.get("weight"));
  const waist = parseOptionalNumber(formData.get("waist"));
  const hips = parseOptionalNumber(formData.get("hips"));
  const bust = parseOptionalNumber(formData.get("bust"));
  const thigh = parseOptionalNumber(formData.get("thigh"));
  const arm = parseOptionalNumber(formData.get("arm"));
  const neck = parseOptionalNumber(formData.get("neck"));
  const bodyFatPercentage = parseOptionalNumber(formData.get("bodyFatPercentage"));
  const note = parseRequiredString(formData.get("note"));

  if (!entryId) {
    return {
      status: "error",
      message: "We could not find the entry to update.",
    };
  }

  if (!date) {
    return {
      status: "error",
      message: "Choose the date for this entry.",
    };
  }

  const hasAnyMetric = [
    weight,
    waist,
    hips,
    bust,
    thigh,
    arm,
    neck,
    bodyFatPercentage,
  ].some((value) => value !== null);

  if (!hasAnyMetric) {
    return {
      status: "error",
      message: "Add at least one metric before saving.",
    };
  }

  const { error } = await supabase
    .from("body_entries")
    .update({
      date,
      weight,
      waist,
      hips,
      bust,
      thigh,
      arm,
      neck,
      body_fat_percentage: bodyFatPercentage,
      note: note || null,
    })
    .eq("id", entryId)
    .eq("user_id", user.id);

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Body entry updated.",
  };
}

export async function deleteBodyEntryAction(
  previousState: FormActionState = defaultFormState,
  formData: FormData,
): Promise<FormActionState> {
  void previousState;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const entryId = parseRequiredString(formData.get("entryId"));

  if (!entryId) {
    return {
      status: "error",
      message: "We could not find the entry to delete.",
    };
  }

  const { error } = await supabase
    .from("body_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", user.id);

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Body entry deleted.",
  };
}

export async function createPeriodEntryAction(
  previousState: FormActionState = defaultFormState,
  formData: FormData,
): Promise<FormActionState> {
  void previousState;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const startDate = parseRequiredString(formData.get("startDate"));

  if (!startDate) {
    return {
      status: "error",
      message: "Choose the start date you want to log.",
    };
  }

  const { error } = await supabase.from("period_entries").insert({
    user_id: user.id,
    start_date: startDate,
  });

  if (error) {
    return {
      status: "error",
      message:
        error.code === "42P01"
          ? "Run the updated SQL setup in Supabase before saving period starts."
          : error.message,
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Period start saved.",
  };
}

export async function updatePeriodEntryAction(
  previousState: FormActionState = defaultFormState,
  formData: FormData,
): Promise<FormActionState> {
  void previousState;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const entryId = parseRequiredString(formData.get("entryId"));
  const startDate = parseRequiredString(formData.get("startDate"));

  if (!entryId) {
    return {
      status: "error",
      message: "We could not find the period start to update.",
    };
  }

  if (!startDate) {
    return {
      status: "error",
      message: "Choose the start date you want to save.",
    };
  }

  const { error } = await supabase
    .from("period_entries")
    .update({
      start_date: startDate,
    })
    .eq("id", entryId)
    .eq("user_id", user.id);

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Period start updated.",
  };
}

export async function deletePeriodEntryAction(
  previousState: FormActionState = defaultFormState,
  formData: FormData,
): Promise<FormActionState> {
  void previousState;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const entryId = parseRequiredString(formData.get("entryId"));

  if (!entryId) {
    return {
      status: "error",
      message: "We could not find the period start to delete.",
    };
  }

  const { error } = await supabase
    .from("period_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", user.id);

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Period start deleted.",
  };
}
