import { MessageCircle } from "lucide-react";
import React from "react";

function Comment({ commentCount }: { commentCount?: number }) {
  return (
    <div title="Reply" className="group flex cursor-pointer items-center">
      <button className="rounded-full p-1.5 transition-colors group-hover:bg-blue-200/90 group-hover:text-blue-500">
        <MessageCircle size={15} />
      </button>
      <span className="text-sm transition-colors group-hover:text-blue-500">
        {commentCount}
      </span>
    </div>
  );
}

export default Comment;
