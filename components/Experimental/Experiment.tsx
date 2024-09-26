"use client";
import { fetchPosts } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import defaultIcon from "@/public/default_icon.png";
import NextImage from "next/image";
import { getRtf } from "@/lib/helper";
import VidComponent from "../FeedComponents/VidComponent";
import Carousel from "../FeedComponents/Carousel";
import SkeletonUI from "../SkeletonUI";
import Like from "./Like";
import Comment from "./Comment";
import { Bookmark, LucideBarChart3, Share2 } from "lucide-react";
import CommentList from "./CommentList";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Experiment() {
  const router = useRouter();

  const query = useQuery({
    queryFn: () => fetchPosts(),
    queryKey: ["posts"],
    staleTime: Infinity,
  });

  if (query.error) return <h1>An unexpected error occured</h1>;

  if (query.isLoading) return <SkeletonUI />;

  return (
    <>
      {query.data?.map((post) => (
        <React.Fragment key={post.id}>
          <article className="mx-auto flex w-full max-w-[520px] cursor-pointer flex-col gap-1 overflow-hidden border-x border-t bg-white px-4 py-2  transition-colors hover:bg-gray-50 max-phones:w-full max-phones:rounded-none">
            <div
              onClick={() => {
                router.push(`status/${post.id}`, { scroll: false });
              }}
              className="flex gap-1"
            >
              <div>
                <div className="relative size-10">
                  <NextImage
                    src={post.author.image || defaultIcon}
                    alt=""
                    width={100}
                    height={100}
                    className="size-10 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div className="flex items-center gap-1">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/profile/${post.author.username}`);
                      console.log("clicked a div element 2");
                    }}
                    className="py-1 text-sm font-bold hover:underline"
                  >
                    {post.author.username}
                  </div>
                  <span>·</span>
                  <span className="text-xs text-gray-500">
                    {getRtf(post.createdAt)}
                  </span>
                </div>
                <span className="text-sm">{post.postBody}</span>
                <VidComponent video={post.postVideo} />
                <Carousel images={post.postImage} />
                <div className="flex items-center justify-between">
                  <Like
                    postId={post.id}
                    likes={post.likes.map((like) => like.userId)}
                  />
                  <Comment commentCount={post._count.comments} />
                  {/* temporary */}
                  <Share2 size={15} />
                  <LucideBarChart3 size={15} />
                  <Bookmark size={15} />
                </div>
              </div>
            </div>
          </article>
          {/* <CommentList /> */}
        </React.Fragment>
      ))}
    </>
  );
}

export default Experiment;

// <div
//   key={post.id}
//   className="mx-auto my-2 w-full max-w-[520px] overflow-hidden rounded-xl border bg-white p-2 max-phones:w-full max-phones:rounded-none"
// >
//   <div className="flex items-center">
//     <Link
//       href={`/${post.author.username}`}
//       className="size-8 cursor-pointer hover:opacity-85"
//     >
//       <NextImage
//         src={post.author.image || defaultIcon}
//         alt=""
//         width={50}
//         height={50}
//         className="rounded-full object-cover"
//       />
//     </Link>
//     <div className="ml-2 flex flex-col">
//       <Link
//         className="cursor-pointer text-sm font-bold hover:underline"
//         href={`/${post.author.username}`}
//       >
//         {post.author.username}
//       </Link>
//       <span className="text-xs text-muted-foreground">
//         {getRtf(post.createdAt)}
//       </span>
//     </div>
//     <div className="ml-auto cursor-pointer rounded-full p-1 hover:bg-gray-200">
//       <DdButton postId={post.id} />
//     </div>
//   </div>
//   <div className="flex w-full flex-col overflow-hidden pl-20 pt-2">
//     {post.postBody && (
//       <span className="whitespace-pre-wrap text-sm">
//         {post.postBody}
//       </span>
//     )}
//     <VidComponent video={post.postVideo} />
//     <Carousel images={post.postImage} />
//   </div>
//   <Like
//     postId={post.id}
//     likes={post.likes.map((like) => like.userId)}
//   />
//   {/* <PostInteraction
//       postId={post.id}
//       likes={}
//       comments={post._count.Comment}
//     />
//     <Comment postId={post.id} /> */}
// </div>
