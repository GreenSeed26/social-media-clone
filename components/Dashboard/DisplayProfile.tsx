"use client";

import { CalendarRange, Mail, MoreVertical, UserPlus } from "lucide-react";
import Image from "next/image";
import profileIcon from "@/public/default_icon.png";
import banner from "@/public/banner.jpg";
import { convertToLocaleString } from "@/lib/convertDate";
import Modal from "../Modal";
import { useState } from "react";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function DisplayProfile({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const createdAtEn = convertToLocaleString(user?.createdAt || "");

  const { data: session, status } = useSession();

  if (!session) {
    redirect("/login"); 
    
  }

  return (
    <>
      <Modal pfp={user?.image || ""} open={open} close={setOpen} />
      <section className="flex flex-col items-center">
        <div className="font-inter w-full border bg-white">
          <div>
            <Image
              className="aspect-[4/2] h-auto w-full object-cover object-top"
              src={user?.bannerImage || banner}
              width={800}
              height={400}
              alt="banner"
              loading="lazy"
            />
          </div>
          <div className="relative flex items-center justify-between px-4 py-6 max-phones:py-4">
            <div onClick={() => setOpen(true)}>
              <Image
                className=" absolute bottom-0 size-40 rounded-full object-cover outline outline-white max-phones:size-32"
                src={user?.image || profileIcon}
                width={256}
                height={256}
                loading="lazy"
                alt=""
              />
            </div>

            <div className="flex items-center justify-evenly gap-2">
              <div className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-400 bg-black px-4 py-2 text-sm text-white outline-none transition-all hover:bg-black/80 max-phones:p-3">
                <UserPlus size={15} />
                <span className="max-phones:hidden">Follow</span>
              </div>
              <div className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-400 bg-black px-4 py-2 text-sm text-white outline-none transition-all hover:bg-black/80 max-phones:p-3">
                <Mail size={15} />
                <span className="max-phones:hidden">Message</span>
              </div>
              <div className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-400 p-2 outline-none transition-all hover:bg-gray-200 max-phones:p-3">
                <MoreVertical size={15} />
              </div>
            </div>
          </div>
          <div className="mx-4 my-2 flex flex-col gap-2">
            <div>
              <h1 className="text-xl font-extrabold">{user?.username}</h1>
              <span className="text-sm text-gray-700">{user?.email}</span>
            </div>
            {user?.bio !== "" && (
              <div className=" flex flex-col text-sm ">
                <span className=" whitespace-pre">{user?.bio}</span>
              </div>
            )}

            <div className="flex items-center gap-1 text-gray-600">
              <CalendarRange size={20} />
              <span className="text- text-sm">Joined {createdAtEn}</span>
            </div>
          </div>
          <div className="flex items-center justify-around">
            <div className="relative h-8">
              <a className=" h-10 px-4" href="#">
                Post
              </a>
              <div className="absolute top-7 w-full rounded-full border-2 border-blue-400"></div>
            </div>
            <div className="relative h-8">
              <a className="h-10 px-4" href="#">
                Replies
              </a>
              {/* <div className="absolute top-7 w-full border-2 border-blue-400 rounded-full"></div> */}
            </div>
            <div className="relative h-8">
              <a className="h-10 px-4" href="#">
                Media
              </a>
              {/* <div className="absolute top-7 w-full border-2 border-blue-400 rounded-full"></div> */}
            </div>
            <div className="relative h-8">
              <a className="h-10 px-4" href="#">
                Likes
              </a>
              {/* <div className="absolute top-7 w-full border-2 border-blue-400 rounded-full"></div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DisplayProfile;
