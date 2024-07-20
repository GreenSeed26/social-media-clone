"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import profileIcon from "@/public/default_icon.png";
import banner from "@/public/banner.jpg";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import ChangeProfilePic from "./ChangeProfilePic";
import ChangeBannerPic from "./ChangeBannerPic";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { updateProfile } from "@/lib/actions";
import UpdateButton from "./UpdateButton";

type UserProps = {
  userData: User;
};

function EditProfileDashboard({ userData }: UserProps) {
  const [newUsername, setNewUsername] = useState<string>(userData.username);
  const [newEmail, setNewEmail] = useState<string>(userData.email);
  const [newImage, setNewImage] = useState<File>();
  const [newBannerImage, setNewBannerImage] = useState<File>();
  const [newBio, setNewBio] = useState<string | null>(userData.bio);
  const [bioLen, setBioLen] = useState<number | null>(
    userData.bio?.length || 0
  );
  const [imgUrl, setImgUrl] = useState<string | null>(userData.image);
  const [bannerUrl, setBannerUrl] = useState<string | null>(
    userData.bannerImage
  );

  const { data: session, update } = useSession();

  const { toast } = useToast();
  const { edgestore: es } = useEdgeStore();

  const router = useRouter();

  const handleTextLength = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const txt = e.target.value;
    setNewBio(txt);
    setBioLen(txt.length);
  };
  const getCroppedImg = (data: File) => {
    setNewImage(data);
    setImgUrl(URL.createObjectURL(data));
  };
  const getCroppedBanner = (data: File) => {
    setNewBannerImage(data);
    setBannerUrl(URL.createObjectURL(data));
  };
  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    let image: string = imgUrl || "";
    let bannerImage: string = bannerUrl || "";

    if (newImage) {
      const imageRes = await es.myPublicImages.upload({
        file: newImage,
        options: {
          replaceTargetUrl: !userData.image ? "" : userData.image,
          temporary: true,
        },
      });

      image = imageRes.url;
    }
    if (newBannerImage) {
      const bannerRes = await es.myPublicImages.upload({
        file: newBannerImage,
        options: {
          replaceTargetUrl: !userData.bannerImage ? "" : userData.bannerImage,
          temporary: true,
        },
      });
      bannerImage = bannerRes.url;
    }
    if (!username || !email) {
      toast({
        title: "Empty Fields",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateProfile(username, email, bio, image, bannerImage);

      await update({
        ...session,
        user: {
          ...session?.user,
          image,
          username,
        },
      });

      toast({
        title: "Profile Updated",
        description: "Profile updated successfully",
      });

      await es.myPublicImages.confirmUpload({ url: image });
      await es.myPublicImages.confirmUpload({ url: bannerImage });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center">
      <form
        action={handleSubmit}
        className="flex w-[600px] flex-col gap-2 border-x border-b"
      >
        <div className="relative">
          <Image
            className="aspect-[4/2] h-auto w-[600px] object-cover object-top"
            src={bannerUrl || banner}
            width={500}
            height={250}
            alt="banner"
          />

          <div className="absolute bottom-1 right-1 flex gap-1">
            <ChangeProfilePic updateProfileUrl={getCroppedImg} />
            <ChangeBannerPic updateBannerUrl={getCroppedBanner} />
          </div>
        </div>
        <div className="relative flex items-center justify-between px-4 py-8">
          <div>
            <Image
              className="absolute bottom-0 aspect-square size-36 rounded-full object-cover outline outline-white"
              src={imgUrl || profileIcon}
              width={200}
              height={200}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 p-2">
          <label className="text-sm font-semibold">Username</label>
          <input
            className="h-8 rounded border px-2 py-4 text-sm font-semibold outline-none"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            name="username"
          />

          <label className="text-sm font-semibold">Email</label>
          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="h-8 rounded border px-2 py-4 text-sm font-semibold outline-none"
            type="text"
            name="email"
          />

          <div className="flex items-end justify-between">
            <label className="text-sm font-semibold">Bio</label>
            <span className="text-xs">{bioLen}/101</span>
          </div>
          <textarea
            onChange={handleTextLength}
            name="bio"
            maxLength={101}
            value={newBio || ""}
            className="h-28 resize-none rounded-lg border p-2 text-sm font-semibold outline-none"
          ></textarea>

          <UpdateButton />
        </div>
      </form>
    </section>
  );
}

export default EditProfileDashboard;
