import React from "react";
import { useFormStatus } from "react-dom";

function RegSubBtn() {
  const { pending: loading } = useFormStatus();
  return (
    <button
      disabled={loading}
      className={`my-5 h-10 w-fit rounded-lg ${loading ? "bg-primary/80" : "bg-primary hover:bg-primary/90"} px-4 text-sm font-semibold text-white `}
    >
      {loading ? "Registering..." : "Register"}
    </button>
  );
}

export default RegSubBtn;
