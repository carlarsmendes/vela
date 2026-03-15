import { logoutAction } from "@/app/auth-actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        className="rounded-full px-3 py-1.5 text-sm text-stone transition hover:bg-rosewater hover:text-ink"
        type="submit"
      >
        Log out
      </button>
    </form>
  );
}
