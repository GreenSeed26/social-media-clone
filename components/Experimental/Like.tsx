"use client";
import { switchLike } from "@/lib/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

function Like({ postId, likes }: { postId: string; likes: string[] }) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });
  const queryClient = useQueryClient();

  const mutateLike = useMutation({
    mutationFn: switchLike,
    onMutate: () =>
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      })),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["posts", postId] }),
    onError: () =>
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount,
        isLiked: !state.isLiked,
      })),
  });

  const like = async () => {
    try {
      mutateLike.mutate(postId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='"mx-2 py-2" my-1 flex items-center gap-2'>
      <form action={like} className="flex items-center">
        <button
          onClick={(e) => e.stopPropagation()}
          className="group peer flex items-center gap-1 rounded-full p-1.5 transition-colors hover:bg-red-200/90"
        >
          {likeState.isLiked ? (
            <Heart
              size={15}
              className="text-red-500 group-hover:text-red-500"
              fill="red"
            />
          ) : (
            <Heart
              size={15}
              className="text-gray-500 transition-colors group-hover:text-red-500"
            />
          )}
        </button>
        <span
          className={`${likeState.isLiked ? "text-red-500" : ""} text-sm text-gray-600 transition-colors group-hover:text-red-500`}
        >
          {likeState.likeCount}
        </span>
      </form>
    </div>
  );
}

export default Like;
