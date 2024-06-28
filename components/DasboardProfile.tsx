"use client";

import { CalendarRange } from "lucide-react";
import Image from "next/image";
import profileIcon from "../public/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png";
import banner from "../public/banner.jpg";
import { convertToLocaleString } from "@/lib/convertDate";
import EditProfile from "./EditProfile";
import Modal from "./Modal";
import { useState } from "react";
import { UserProps } from "@/app/types";


function DashboardProfile({user} : {user: UserProps} ) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);

  return (
    <>
      <Modal pfp={user.image} open={isOpen} close={setIsOpen} />
      <section className="flex flex-col items-center">
        <div className="font-inter w-full border">
          <div className="relative aspect-[4/2] h-auto w-full">
            <Image
              className="w-full object-cover object-top"
              src={user.bannerImage || banner}
              fill
              sizes="(min-width: 680px) 50vw"
              alt="banner"
              loading="lazy"
            />
          </div>
          <div className="relative flex items-center justify-between px-4 py-6 max-phones:py-4">
            <div onClick={handleOpenModal}>
              <Image
                className="absolute bottom-0 size-40 rounded-full object-cover outline outline-white max-phones:size-32"
                src={user.image || profileIcon}
                width={256}
                height={256}
                loading="lazy"
                alt=""
              />
            </div>
            <div className="flex items-center justify-evenly gap-2">
              <EditProfile id={user.username} />
            </div>
          </div>
          <div className="mx-5 my-2 flex flex-col gap-2">
            <div>
              <h1 className="text-xl font-extrabold">{user.username}</h1>
              <span className="text-sm text-gray-700">{user.email}</span>
            </div>
            {user.bio && (
              <div className="flex flex-col text-sm">
                <span className="whitespace-pre">{user.bio}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-gray-600">
              <CalendarRange size={20} />
              <span className="text- text-sm">
                Joined {convertToLocaleString(user.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardProfile;
