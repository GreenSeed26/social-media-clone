"use client"
import { getPost } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { FeedPostType } from "../types";

export function useGetPost(postId: string) {
  return useQuery<FeedPostType>({
    queryFn: () => getPost(postId),
    queryKey: ["post", postId],
  });
}
