import Image from "next/image";
import profileIcon from "@/public/default_icon.png";
import React from "react";

function CommentList() {
  return (
    <div className="flex w-full max-w-[520px] gap-1 border-x bg-white px-4 py-2 transition-colors hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center gap-1">
        <div className="relative mr-2 size-10">
          <Image
            src={profileIcon}
            alt=""
            height={50}
            width={50}
            className="size-10 rounded-full ring ring-blue-100"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold">User</span> <span>·</span>
            <span className="text-xs">1 hr</span>
          </div>
          <span className="text-sm">Pretty😍</span>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
