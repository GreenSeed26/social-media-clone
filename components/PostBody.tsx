"use client";

import { useEffect, useState } from "react";
import defaultIcon from "../public/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png";
import SkeletonUI from "./SkeletonUI";
import Image from "next/image";
import { convertToLocaleString } from "@/lib/convertDate";
import Link from "next/link";
import { AlertCircle, Bookmark, Code, Heart, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useSWR, { mutate } from "swr";
import PostInteraction from "./PostInteraction";
import { useSession } from "next-auth/react";
type Posts = {
  id: string;
  postBody: string;
  postImage: string;
  likes: string[];
  authorImage: string;
  authorId: string;
  createdAt?: string;
  updatedAt?: string;
};

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function PostBody() {
  const { data, error, isLoading } = useSWR<Posts[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (error) return <h1>Error fetching data</h1>;
  if (isLoading) return <SkeletonUI />;

  return (
    <>
      <div>
        <div>
          {data?.map((post) => (
            <div
              key={post.id}
              className="mx-auto mt-6 w-[440px] rounded border py-2 max-phones:w-full max-phones:rounded-none"
            >
              <div className="flex items-center px-2">
                <Link
                  href={`/${post.authorId}`}
                  className="size-12 cursor-pointer hover:opacity-85 "
                >
                  <Image
                    src={!post.authorImage ? defaultIcon : post.authorImage}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </Link>
                <div className="ml-2 flex flex-col">
                  <Link
                    className=" cursor-pointer text-sm font-bold hover:underline"
                    href={`/${post.authorId}`}
                  >
                    {post.authorId}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {convertToLocaleString(post.createdAt as string)}
                  </span>
                </div>
                <div className="ml-auto cursor-pointer rounded-full p-1 hover:bg-gray-200">
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
                </div>
              </div>
              <div className="px-2 pt-4">
                {post.postBody && (
                  <span className="whitespace-pre-wrap text-sm">
                    {post.postBody}
                  </span>
                )}
                {post.postImage && (
                  <div className="relative">
                    <Image
                      src={post.postImage}
                      alt=""
                      width={1500}
                      height={1500}
                      className="w-full h-auto rounded"
                    />
                  </div>
                )}
              </div>
              <PostInteraction postId={post.id} likes={post.likes} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PostBody;
