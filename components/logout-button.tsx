import { logoutAction } from "@/app/auth-actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        className="px-1 py-1 text-sm text-stone transition hover:text-ink"
        type="submit"
      >
        Log out
      </button>
    </form>
  );
}
