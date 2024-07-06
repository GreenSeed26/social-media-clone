"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ImageInput, VideoInput } from "./VideoAndImage";
import { createPost } from "@/lib/actions";
import { PostButton } from "./FormButton";
import { X } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { useToast } from "./ui/use-toast";
export default function CreatePostForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const vidRef = React.useRef<HTMLVideoElement>(null);
  const [imgPrev, setImgPrev] = useState<string[]>([]);
  const [imgFile, setImgFile] = useState<File[]>([]);
  const [vidPrev, setVidPrev] = useState<string>("");
  const [vidFile, setVidFile] = useState<File | undefined>();
  const { edgestore: es } = useEdgeStore();

  const { toast } = useToast();
  const getImage = (data: string[], file: File[]) => {
    setImgPrev(data);
    setImgFile(file);
  };
  const getVideo = (data: string, file?: File) => {
    setVidPrev(data);
    setVidFile(file);
  };

  const handleMediaUpload = async (formData: FormData) => {
    let vidUrl = "";
    let imgUrl: string[] = [];
    if (vidFile) {
      const res = await es.myPublicFiles.upload({
        file: vidFile,
        options: { temporary: true },
      });

      vidUrl = res.url;
    }

    for (let i = 0; i < imgFile.length; i++) {
      const res = await es.myPublicImages.upload({
        file: imgFile[i],
        options: { temporary: true },
      });
      imgUrl.push(res.url);
    }

    const postContent = formData.get("postBody") as string;
    if (!postContent && !vidUrl && imgUrl.length === 0) {
      setOpen(false);
      return;
    }
    try {
      await createPost(postContent, vidUrl, imgUrl);
      toast({
        title: "Upload Finished",
        description: "Post created successfully",
      });
      setOpen(false);
      for (let i = 0; i < imgUrl.length; i++) {
        await es.myPublicImages.confirmUpload({ url: imgUrl[i] });
      }
      await es.myPublicFiles.confirmUpload({ url: vidUrl });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (index: number) => {
    setImgPrev((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <form action={handleMediaUpload} className="flex flex-col">
      <div className="textarea-scroll h-auto w-full">
        <textarea
          className="h-auto w-full resize-none whitespace-pre-wrap text-sm outline-none"
          name="postBody"
          placeholder={`What's on your mind, ${"placeholder"}?`}
        ></textarea>
        {vidPrev && (
          <video
            className="h-96 w-full"
            ref={vidRef}
            height={675}
            width={1200}
            controls
            muted
          >
            <source src={vidPrev} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {imgPrev.length > 0 && (
          <div className="flex h-auto max-h-80 flex-wrap items-stretch justify-center gap-1">
            {imgPrev.map((img, index) => (
              <div key={index} className="relative size-24">
                <Image
                  src={img}
                  alt="imgPostPrev"
                  height={1500}
                  width={1500}
                  className="size-24 rounded-xl border-white object-cover shadow-xl ring-1"
                />
                <span
                  onClick={() => handleDelete(index)}
                  className="absolute -right-1 -top-1 rounded-full bg-white p-1 ring-1 ring-black"
                >
                  <X size={10} />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="m-2 flex justify-between">
        <ImageInput getImage={getImage} />
        <VideoInput getVideo={getVideo} />
      </div>
      <PostButton />
    </form>
  );
}
