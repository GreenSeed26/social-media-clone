"use client";
import { MoreVertical, SendHorizonal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { useRef } from "react";
import { User, Comment } from "@prisma/client";
import { getRtf } from "@/lib/helper";
import { Session } from "next-auth";

type CommentListProps = Comment & { user: User };

function CommentSec({
  optimisticComment,
  session,
  add,
}: {
  optimisticComment: CommentListProps[];
  session: Session | null;
  add: (fd: FormData) => Promise<void>;
}) {
  const user = session?.user;
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Dialog>
      <DialogTrigger>
        <div className="mx-2 text-xs font-medium hover:underline">
          See more comments &#40;{optimisticComment.length}&#41;
        </div>
      </DialogTrigger>
      <DialogContent className="inviscroll flex w-full max-w-[500px] flex-col gap-0 p-0">
        <DialogHeader className="sticky top-0 z-10  rounded-t-3xl border-b bg-white p-2">
          Comments
        </DialogHeader>
        <div className="max-h-96 flex-1 flex-col overflow-hidden overflow-y-scroll">
          {optimisticComment.map((comment) => (
            <div className="flex gap-2 p-2" key={comment.id}>
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
        </div>
        <div className="flex gap-2 border-t p-1.5">
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
      </DialogContent>
    </Dialog>
  );
}

export default CommentSec;
