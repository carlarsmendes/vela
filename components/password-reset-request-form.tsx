"use client";

import Link from "next/link";
import { useActionState } from "react";

import { SubmitButton } from "@/components/submit-button";
import type { AuthActionState } from "@/types";

type PasswordResetRequestFormProps = {
  action: (
    state: AuthActionState,
    formData: FormData,
  ) => Promise<AuthActionState>;
};

const initialState: AuthActionState = {
  status: "idle",
};

export function PasswordResetRequestForm({ action }: PasswordResetRequestFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <p className="text-sm leading-6 text-stone">
        We will send you a link to continue the password reset flow.
      </p>

      <div className="space-y-2">
        <label className="text-sm font-medium text-ink" htmlFor="forgot-password-email">
          Email
        </label>
        <input
          autoComplete="email"
          className="w-full rounded-2xl border border-line bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-pine focus:bg-white"
          id="forgot-password-email"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
      </div>

      {state.message ? (
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            state.status === "error"
              ? "border border-[#efc5bc] bg-[#fff4f1] text-[#7b3f31]"
              : "border border-[#d8e6dd] bg-[#f4fbf6] text-pine"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <SubmitButton idleLabel="Send reset link" pendingLabel="Sending link..." />

      <Link
        className="inline-flex text-sm font-medium text-stone transition hover:text-ink"
        href="/login"
      >
        Back to log in
      </Link>
    </form>
  );
}
