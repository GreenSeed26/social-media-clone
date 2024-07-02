"use client";
import { Heart, MessageCircleMore } from "lucide-react";
import React, { useOptimistic, useState } from "react";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";
import { switchLike } from "@/lib/actions";

function PostInteraction({
  postId,
  likes,
}: {
  postId: string;
  likes: string[];
}) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    },
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {}
  };

  return (
    <div className="mx-2 mt-1 flex items-center gap-2 border-t pt-2">
      <form action={likeAction}>
        <button className="flex items-center gap-1 rounded bg-gray-300 p-1">
          {optimisticLike.isLiked ? (
            <Heart size={15} className="text-red-500" fill="red" />
          ) : (
            <Heart size={15} className="text-gray-800" />
          )}

          <div className="h-4 border border-gray-400"></div>
          <span className="text-xs">{optimisticLike.likeCount}</span>
        </button>
      </form>
      <button className="flex items-center gap-1 rounded bg-gray-300 p-1">
        <MessageCircleMore size={15} className="text-gray-800" />
        <div className="h-4 border border-gray-400"></div>
        <span className="text-xs">0</span>
      </button>
    </div>
  );
}

export default PostInteraction;
