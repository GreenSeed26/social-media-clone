"use client";
import Image from "next/image";
import React, { useState } from "react";
import CreatePost from "./CreatePost";
import { ImageIcon, VideoIcon } from "lucide-react";
import defaultIcon from "@/public/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png";
import { UserProps } from "@/app/types";

function HomePage({ user }: { user: UserProps }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto w-[440px] flex-col justify-center border-x border-b p-2 max-phones:w-full">
      <div className="flex items-center">
        <Image
          src={user.image ? user.image : defaultIcon}
          width={60}
          height={60}
          alt="pfpIcon"
          className="mr-2 size-10 rounded-full"
        />
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
  );
}

export default HomePage;
