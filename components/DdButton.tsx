import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { AlertCircle, Bookmark, Code, MoreVertical } from "lucide-react";

function DdButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center outline-none">
        <MoreVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex items-center gap-2">
          <Bookmark size={15} />
          <span>Save Post</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Code size={15} />
          <span>Embed Post</span>
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
