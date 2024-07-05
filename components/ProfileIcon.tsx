"use client";
import { signOut } from "next-auth/react";
import { Separator } from "@radix-ui/react-separator";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Settings,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import defaultIcon from "@/public/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png";
import { UserInfo } from "@/app/types";

function ProfileIcon({ user }: UserInfo) {
  const [drop, setDrop] = useState(false);

  return (
    <>
      <div
        className="relative"
        onClick={() => {
          setDrop((curr) => !curr);
        }}
      >
        <div
          className={` ${!drop ? "h-0 opacity-0" : "h-28 py-2 "} absolute flex w-32 -translate-x-[92px] translate-y-12 items-center overflow-hidden rounded-md bg-white px-2 shadow-lg transition-all duration-300 dark:bg-gray-700`}
        >
          <div className="flex w-full flex-col items-center">
            <span className="text-xs">@{user.username}</span>
            <Separator className="my-0.5 h-[1px] w-full bg-gray-200" />
            <div className="flex w-full cursor-pointer flex-col justify-start text-xs leading-6">
              <Link
                href={`/profile/${user.username}`}
                className="flex items-center rounded px-1 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <UserIcon size={14} />
                <span className="ml-2">Profile</span>
              </Link>
              <Link
                href={"/settings"}
                className="flex items-center rounded px-1 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Settings size={14} />
                <span className="ml-2">Settings</span>
              </Link>
              <div
                className="group flex items-center rounded px-1 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={(e) => {
                  signOut();
                }}
              >
                <LogOut className=" group-hover:text-red-500" size={14} />
                <span className="ml-2 group-hover:text-red-500">Log Out</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src={user.image ? user.image : defaultIcon}
            alt=""
            height={80}
            width={80}
            loading="lazy"
            className="size-10 rounded-full"
          />
        </div>
        <div className="absolute bottom-0 right-0 flex size-3 items-center justify-center rounded-full bg-gray-300 ring-1 ring-zinc-100 dark:bg-zinc-700 dark:ring-zinc-600">
          {drop ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </div>
      </div>
    </>
  );
}

export default ProfileIcon;
