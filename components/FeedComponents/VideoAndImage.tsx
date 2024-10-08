"use client";
import { ImageIcon, VideoIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useToast } from "../ui/use-toast";

export function VideoInput({
  getVideo,
}: {
  getVideo: (data: string, file?: File) => void;
}) {
  const handleVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("video/")) {
      const vidUrl = URL.createObjectURL(file);
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
  getImage: (data: string[], file: File[]) => void;
}) {
  const { toast } = useToast();
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      // if (files.length > 4) {
      //   toast({
      //     title: "Error",
      //     description: "Maximum of 4 Images can only be accepted!",
      //     variant: "destructive",
      //   });
      //   return;
      // }
      const imageFile = Array.from(files);
      const imgPrev = imageFile.map((file) => URL.createObjectURL(file));
      const img = new Image();
      getImage(imgPrev, imageFile);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="images"
        hidden
        multiple
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
