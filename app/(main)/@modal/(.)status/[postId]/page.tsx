"use client";
import { useGetPost } from "@/app/reactQueryHooks/useGetPost";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Carousel from "@/components/Experimental/Carousel";
import Link from "next/link";
import Image from "next/image";
import defaultIcon from "@/public/default_icon.png";
import { getRtf } from "@/lib/helper";
import { LucideMoreHorizontal } from "lucide-react";

function Status({ params }: { params: { postId: string } }) {
  const { data: post, isLoading } = useGetPost(params.postId);
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  });
  const close = () => {
    router.back();
    document.body.style.overflow = "auto";
  };

  if (isLoading) return <h1>Loading</h1>;
  return (
    <dialog
      onClick={() => dialogRef.current?.close()}
      onClose={close}
      ref={dialogRef}
      className="backdrop:bg-black/80 focus-within:outline-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[550px] min-h-[530px] max-w-4xl md:flex"
      >
        <div className="w-2/5">
          <Carousel images={post?.postImage || []} />
        </div>
        <div className="w-3/5 py-2">
          <div className="flex items-center px-2">
            <Link
              href={`/${post?.author.username}`}
              className="size-8 cursor-pointer hover:opacity-85"
            >
              <Image
                src={post?.author.image || defaultIcon}
                alt=""
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            </Link>
            <div className="ml-2 flex flex-col">
              <Link
                className="cursor-pointer text-sm font-bold hover:underline"
                href={`/${post?.author.username}`}
              >
                {post?.author.username}
              </Link>
              <span className="text-xs text-muted-foreground">
                {getRtf(post?.createdAt)}
              </span>
            </div>
            <div className="ml-auto cursor-pointer rounded-full p-1 hover:bg-gray-200">
              <LucideMoreHorizontal size={15} />
              {/* <DdButton /> */}
            </div>
          </div>
          <p className="px-2 py-1 text-sm">{post?.postBody}</p>
        </div>
      </div>
    </dialog>
  );
}

export default Status;
