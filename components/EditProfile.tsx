import { MoreVertical, Pencil } from "lucide-react";
import Link from "next/link";

function EditProfile({ id }: { id: string }) {
  return (
    <Link
      href={`/editDashboard/${id}`}
      className="flex items-center gap-1 rounded-full border border-gray-400 bg-black px-4 py-2 text-sm text-white outline-none transition-all hover:bg-black/80"
    >
      <Pencil size={15} />
      <span>Edit Profile</span>
    </Link>
  );
}

export default EditProfile;
