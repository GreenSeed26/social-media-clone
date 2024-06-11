"use client";
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        })
      }
      className="rounded bg-red-500 p-1 text-sm text-white"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
