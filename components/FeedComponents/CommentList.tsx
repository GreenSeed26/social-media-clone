"use client";
import { addComment } from "@/lib/actions";
import { getRtf } from "@/lib/helper";
import { Comment, User } from "@prisma/client";
import { MoreVertical, SendHorizonal } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useOptimistic, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import CommentSec from "./CommentSec";

type CommentListProps = Comment & { user: User };
function CommentList({
  comments,
  postId,
}: {
  comments: CommentListProps[];
  postId: string;
}) {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [comment, setComment] = useState(comments);
  const formRef = useRef<HTMLFormElement>(null);

  const add = async (fd: FormData) => {
    const desc = fd.get("desc") as string;

    if (!user || !desc) return;

    console.log("add comment");

    addOptimisticComment({
      id: Math.random().toString(),
      desc: desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId,
      user: {
        id: user.id,
        username: user.username,
        image: user.image || "/default_icon.png",
        bannerImage: "",
        bio: "",
        email: "",
        password: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdComment = await addComment(postId, desc);
      setComment((prev) => [createdComment, ...prev]);
      formRef.current?.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticComment, addOptimisticComment] = useOptimistic(
    comment,
    (state, value: CommentListProps) => [value, ...state],
  );

  return (
    <>
      {optimisticComment.length > 3 && (
        <CommentSec
          optimisticComment={optimisticComment}
          session={session}
          add={add}
        />
      )}
      {optimisticComment.slice(0, 3).map((comment) => (
        <div className="mt-2 flex gap-2 px-2" key={comment.id}>
          <Image
            src={comment.user.image || "/default_icon.png"}
            alt=""
            width={40}
            height={40}
            className="size-8 rounded-full"
          />

          <div>
            <div className="flex min-w-32 flex-col gap-1 rounded-lg bg-gray-200 px-2 py-1">
              <span className="text-xs font-medium">
                {comment.user.username}
              </span>
              <p className="text-sm ">{comment.desc}</p>
            </div>
            <div className="mt-1.5 flex gap-2  px-2 text-xs text-gray-500">
              <span>{getRtf(comment.createdAt)}</span>
              <button className="hover:underline">Like</button>
              <button className="hover:underline">Reply</button>
              <button className="hover:underline">Share</button>
            </div>
          </div>

          <div className="my-auto">
            <button className="size-fit rounded-full p-1 transition-all hover:bg-gray-200">
              <MoreVertical size={15} color="gray" />
            </button>
          </div>
        </div>
      ))}

      <div className="mx-2 mt-2 flex items-center gap-2 border-t pt-2">
        <Image
          src={user?.image || "/default_icon.png"}
          alt=""
          width={90}
          height={90}
          className="size-8 rounded-full"
        />
        <form action={add} ref={formRef} className="flex flex-1 gap-1">
          <textarea
            className="h-8 w-full resize-none rounded-full bg-gray-300 px-3 py-1.5 text-sm outline-none placeholder:text-gray-600"
            name="desc"
            placeholder="Comment"
          ></textarea>
          <button>
            <SendHorizonal size={20} />
          </button>
        </form>
      </div>
    </>
  );
}

export default CommentList;
