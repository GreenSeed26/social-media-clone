"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

function UpdateButton() {
  const { pending: isLoading } = useFormStatus();
  const router = useRouter();
  return (
    <div className="flex justify-end gap-2 pt-1">
      <button
        disabled={isLoading}
        className={`flex h-8 items-center gap-1 rounded-lg border px-2 text-sm text-white 
    ${
      isLoading ? "bg-primary/80" : "bg-primary hover:bg-primary/80"
    } transition-colors`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>Saving</p>
          </>
        ) : (
          "Save Changes"
        )}
      </button>
      <label
        onClick={() => router.back()}
        className="flex h-8 items-center rounded-lg border bg-destructive px-2 text-sm text-white hover:bg-destructive/80"
      >
        Discard
      </label>
    </div>
  );
}

export default UpdateButton;
