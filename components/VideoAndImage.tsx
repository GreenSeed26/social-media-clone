"use client";
import { ImageIcon, VideoIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

export function VideoInput({
  getVideo,
}: {
  getVideo: (data: string, file?: File) => void;
}) {
  const handleVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (file && file.type.startsWith("video/")) {
      const vidUrl = URL.createObjectURL(file);
      console.log(vidUrl);
      getVideo(vidUrl, file);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="video/*"
        id="video"
        hidden
        onChange={handleVideo}
      />
      <label
        htmlFor="video"
        className="mx-1 flex w-full items-center justify-center gap-1 rounded p-1 hover:bg-gray-200"
      >
        <VideoIcon size={20} className=" text-rose-500" />
        <span className="text-sm ">Video</span>
      </label>
    </>
  );
}

export function ImageInput({
  getImage,
}: {
  getImage: (data: string, file?: File) => void;
}) {
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file as Blob);
    getImage(url, file);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="images"
        hidden
        onChange={handleImage}
      />
      <label
        htmlFor="images"
        className="mx-1 flex w-full items-center justify-center gap-1 rounded p-1 hover:bg-gray-200"
      >
        <ImageIcon size={20} className="text-blue-400" />
        <span className="text-sm">Photo</span>
      </label>
    </>
  );
}
