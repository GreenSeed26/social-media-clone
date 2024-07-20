import { useFormStatus } from "react-dom";

interface ButtonProps {
  loading?: boolean;
  onClick?: () => void;
  title: string;
}

export function FormButton({ onClick, title, loading }: ButtonProps) {
  return (
    <button
      className="mt-1 w-full rounded bg-blue-500 p-1 text-sm text-white"
      onClick={onClick}
    >
      {title}
      {loading && "..."}
    </button>
  );
}

export function PostButton() {
  const { pending: loading } = useFormStatus();
  return (
    <button
      disabled={loading}
      className={`${loading ? "bg-blue-500/80" : "bg-blue-500 hover:bg-blue-600"} mt-1 w-full rounded p-1 text-sm text-white`}
      type="submit"
    >
      {loading ? "Posting..." : "Post"}
    </button>
  );
}

export function PostButton2({ next }: { next: boolean }) {
  const { pending: loading } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full rounded ${loading ? "bg-blue-500/80" : "bg-blue-500"} p-1 text-white ${next ? "phones:hidden" : "hidden"} `}
    >
      {loading ? "Posting" : "Post"}
    </button>
  );
}

export function PostButton3() {
  const { pending: loading } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={loading}
      className={`${loading ? "bg-blue-500/80" : "bg-blue-500"} w-full rounded p-1 text-white max-phones:hidden`}
    >
      {loading ? "Posting" : "Post"}
    </button>
  );
}
