"use client";
import { ImageIcon, VideoIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

export function VideoInput() {
  return (
    <>
      <input type="file" accept="video/*" id="video" hidden disabled />
      <label
        htmlFor="video"
        className="mx-1 flex w-full items-center justify-center gap-1 rounded p-1 hover:bg-gray-200"
        onClick={() => alert("this feature is currently in the works")}
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
