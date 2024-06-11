"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";

import { TDisplayProfile } from "@/app/types";
import Image from "next/image";
import profileIcon from "../public/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png";
import banner from "../public/banner.jpg";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEdgeStore } from "@/lib/edgestore";
import ChangeProfilePic from "./ChangeProfilePic";
import ChangeBannerPic from "./ChangeBannerPic";

function EditProfileDashboard({ user }: { user: TDisplayProfile }) {
  const [username, setUsername] = useState<string>(user.user.username);
  const [email, setEmail] = useState<string>(user.user.email);
  const [image, setImage] = useState<File>();
  const [bannerImage, setBannerImage] = useState<File>();
  const [bio, setBio] = useState<string>(user.user.bio);
  const [bioLen, setBioLen] = useState(bio.length);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>(user.user.image);
  const [bannerUrl, setBannerUrl] = useState<string>(user.user.bannerImage);

  const { toast } = useToast();
  const { edgestore } = useEdgeStore();

  const router = useRouter();

  const handleTextLength = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const txt = e.target.value;
    setBio(txt);
    setBioLen(txt.length);
  };
  const getCroppedImg = (data: File) => {
    setImage(data);
    setImgUrl(URL.createObjectURL(data));
  };
  const getCroppedBanner = (data: File) => {
    setBannerImage(data);
    setBannerUrl(URL.createObjectURL(data));
  };
  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email) {
      toast({
        title: "Empty Fields !",
        description: "All fields cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      if (image) {
        const res = await edgestore.myPublicImages.upload({
          file: image,
        });

        try {
          await fetch(`/api/user/${user.user.username}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: res.url,
            }),
          });

          await fetch(`/api/posts/${user.user.username}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              authorImage: res.url,
            }),
          });
        } catch (error) {
          console.log(error);
        }
      }
      if (bannerImage) {
        const res = await edgestore.myPublicImages.upload({
          file: bannerImage,
        });

        try {
          await fetch(`/api/user/${user.user.username}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bannerImage: res.url,
            }),
          });
        } catch (error) {
          console.log(error);
        }
      }
      const res = await fetch(`/api/user/${user.user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          bio,
        }),
      });

      if (!res.ok) {
        return;
      } else {
        router.push(`/profile/${user.user.username}`);
        router.refresh();
        setIsLoading(false);
        toast({
          title: "Changed Successfully!",
          variant: "default",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Oops! Something Went Wrong",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <section className="flex justify-center">
      <form
        onSubmit={handleSumbit}
        className="flex w-[600px] flex-col gap-2 border-x border-b"
      >
        <div className="relative">
          <Image
            className="aspect-[4/2] h-auto w-[600px] object-cover object-top"
            src={bannerUrl === "" ? banner : bannerUrl}
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
              src={imgUrl === "" ? profileIcon : imgUrl}
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
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
          />

          <label className="text-sm font-semibold">Email</label>
          <input
            className="h-8 rounded border px-2 py-4 text-sm font-semibold outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
          />

          <div className="flex items-end justify-between">
            <label className="text-sm font-semibold">Bio</label>
            <span className="text-xs">{bioLen}/101</span>
          </div>
          <textarea
            value={bio}
            maxLength={101}
            onChange={handleTextLength}
            className="h-28 resize-none rounded-lg border p-2 text-sm font-semibold outline-none"
          ></textarea>

          <div className="flex justify-end gap-2 pt-1">
            <button
              disabled={isLoading}
              className={`flex h-8 items-center gap-1 rounded-lg border px-2 text-sm text-white 
            ${
              isLoading ? "bg-primary/80" : "bg-primary hover:bg-primary/80"
            } transition-colors`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p>Saving</p>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <label
              onClick={() => router.back()}
              className="flex h-8 items-center rounded-lg border bg-destructive px-2 text-sm text-white hover:bg-destructive/80"
            >
              Discard
            </label>
          </div>
        </div>
      </form>
      {/* <ImageUpload /> */}
    </section>
  );
}

export default EditProfileDashboard;
