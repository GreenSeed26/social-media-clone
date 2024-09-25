"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ImageIcon, VideoIcon } from "lucide-react";
import defaultIcon from "@/public/default_icon.png";
import { Post, User } from "@prisma/client";
import CreatePost from "./FeedComponents/CreatePost";

type HomeProps = {
  user: User & { post: Post[] };
};

function HomePage({ user }: HomeProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mx-auto w-[520px] flex-col justify-center border-x border-t bg-white p-2 max-phones:w-full max-phones:rounded-none ">
        <div className="flex items-center">
          <Image
            src={user?.image || defaultIcon}
            width={60}
            height={60}
            alt="pfpIcon"
            className="mr-2 size-10 rounded-full"
          />
          {/* <NewPostForm user={user} /> */}
          <CreatePost username={user.username} open={open} setOpen={setOpen} />
        </div>
        <div className="mt-2 flex justify-between divide-x-2">
          <label
            onClick={() => setOpen(true)}
            id="image"
            className="flex w-full items-center justify-center gap-1 p-1 hover:bg-gray-100"
          >
            <ImageIcon size={20} className="text-blue-400" />
            <span className="text-sm">Photo</span>
          </label>

          <label
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center gap-1 p-1 hover:bg-gray-100"
          >
            <VideoIcon size={20} className=" text-rose-500" />
            <span className="text-sm ">Video</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default HomePage;
