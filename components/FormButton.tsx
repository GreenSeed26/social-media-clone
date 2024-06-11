interface ButtonProps {
  loading?: boolean;
  onClick?: () => void;
  title: string;
}

function FormButton({ onClick, title, loading }: ButtonProps) {
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

export default FormButton;
