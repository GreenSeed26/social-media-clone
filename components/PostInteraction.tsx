import { Heart } from "lucide-react";
import React from "react";

function PostInteraction({
  postId,
  likes,
}: {
  postId: string;
  likes: string[];
}) {
  return (
    <div className="mx-2 mt-1 flex items-center border-t pt-2">
      <button className="flex items-center gap-1">
        <Heart size={15} className="text-gray-500" />
        <span className="text-xs">0</span>
      </button>
    </div>
  );
}

export default PostInteraction;
