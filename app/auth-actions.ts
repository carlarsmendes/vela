"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AuthActionState } from "@/types";

const defaultAuthState: AuthActionState = {
  status: "idle",
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function loginAction(
  previousState: AuthActionState = defaultAuthState,
  formData: FormData,
): Promise<AuthActionState> {
  void previousState;

  if (!hasSupabaseEnv()) {
    return {
      status: "error",
      message: "Add your Supabase URL and anon key before testing auth.",
    };
  }

  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");

  if (!email || !password) {
    return {
      status: "error",
      message: "Enter both email and password.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  redirect("/dashboard");
}

export async function signupAction(
  previousState: AuthActionState = defaultAuthState,
  formData: FormData,
): Promise<AuthActionState> {
  void previousState;

  if (!hasSupabaseEnv()) {
    return {
      status: "error",
      message: "Add your Supabase URL and anon key before testing auth.",
    };
  }

  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");

  if (!email || !password) {
    return {
      status: "error",
      message: "Enter both email and password.",
    };
  }

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // TODO: Update Supabase redirect URLs so this callback is allowed in local
      // and production environments before relying on email confirmation.
      emailRedirectTo: `${origin}/auth/callback?next=/onboarding`,
    },
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  if (data.session) {
    redirect("/onboarding");
  }

  return {
    status: "success",
    message: "Check your email to confirm your account, then continue with onboarding.",
  };
}

export async function forgotPasswordAction(
  previousState: AuthActionState = defaultAuthState,
  formData: FormData,
): Promise<AuthActionState> {
  void previousState;

  if (!hasSupabaseEnv()) {
    return {
      status: "error",
      message: "Add your Supabase URL and anon key before testing auth.",
    };
  }

  const email = getStringValue(formData, "email");

  if (!email) {
    return {
      status: "error",
      message: "Enter the email you use for Vela.",
    };
  }

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "If that email is registered, a reset link is on its way.",
  };
}

export async function updatePasswordAction(
  previousState: AuthActionState = defaultAuthState,
  formData: FormData,
): Promise<AuthActionState> {
  void previousState;

  if (!hasSupabaseEnv()) {
    return {
      status: "error",
      message: "Add your Supabase URL and anon key before testing auth.",
    };
  }

  const password = getStringValue(formData, "password");
  const confirmPassword = getStringValue(formData, "confirmPassword");

  if (!password || !confirmPassword) {
    return {
      status: "error",
      message: "Enter and confirm your new password.",
    };
  }

  if (password.length < 6) {
    return {
      status: "error",
      message: "Use at least 6 characters for your password.",
    };
  }

  if (password !== confirmPassword) {
    return {
      status: "error",
      message: "Passwords do not match.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      status: "error",
      message: "Your recovery session is missing or expired. Request a new reset link.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "Password updated. You can log in with your new password now.",
  };
}
