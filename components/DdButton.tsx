"use client"
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  AlertCircle,
  Bookmark,
  Code,
  Edit2,
  MoreVertical,
  Trash2,
} from "lucide-react";

function DdButton({ postId }: { postId: string }) {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center outline-none">
        <MoreVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            router.push(`/editPost/${postId}`);
          }}
        >
          <Edit2 size={15} />
          <span>Edit Post</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Bookmark size={15} />
          <span>Save Post</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Code size={15} />
          <span>Embed Post</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:bg-red-100 focus:text-red-500">
          <Trash2 size={15} />
          <span>Delete</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <AlertCircle size={15} />
          <span>Report Post</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DdButton;
