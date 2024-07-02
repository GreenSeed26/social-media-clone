"use client";

import { ImageIcon, VideoIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ImageInput, VideoInput } from "./VideoAndImage";
import { useSession } from "next-auth/react";

type SessionProp = {
  userName?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePost = ({ userName, open, setOpen }: SessionProp) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const vidRef = useRef(null);
  const [post, setPost] = useState("");
  const [textLength, setTextLength] = useState(false);
  const [imgPrev, setImgPrev] = useState<string[]>([]);
  const [vidPrev, setVidPrev] = useState<string>("");
  const [imgFile, setImgFile] = useState<File[]>([]);
  const [vidFile, setVidFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const [className, setClassName] = useState<string>("object-cover");

  const getVideo = (data: string, file?: File) => {
    setVidPrev(data);
    setVidFile(file);
  };

  const getImage = (data: string[], file: File[]) => {
    setImgFile(file);
    setImgPrev(data);
  };

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setPost(newText);
    setTextLength(newText.length >= 100);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height to auto
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      if (textAreaRef.current.clientHeight > 288) {
        textAreaRef.current.style.overflowY = "auto";
        textAreaRef.current.style.height = "288px";
      }
    }
  }, [post]);

  const handleDelete = (index: number) => {
    setImgPrev((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!post && !imgFile && !vidFile) {
      return alert("Empty Fields");
    }

    setLoading(true);

    try {
      let postImage: string[] = [];
      let postVideo = "";

      for (let i = 0; i < imgFile?.length; i++) {
        if (imgFile?.[i]) {
          const res = await edgestore.myPublicFiles.upload({
            file: imgFile[i],
          });
          postImage.push(res.url);
        }
      }

      if (vidFile) {
        const res = await edgestore.myPublicFiles.upload({ file: vidFile });
        postVideo = res.url;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postBody: post, postImage, postVideo }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start rounded-full"
          variant="outline"
          onClick={handleDialogOpen}
        >
          What&apos;s on your mind?
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed w-[500px] max-phones:w-96">
        <X
          size={20}
          className="absolute right-0 -translate-x-4 translate-y-4 focus:outline"
          onClick={() => setOpen(false)}
        />
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>{userName}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="textarea-scroll h-auto w-full">
            <textarea
              value={post}
              onChange={handleText}
              className="h-auto w-full resize-none whitespace-pre-wrap text-sm outline-none"
              placeholder={`What's on your mind, ${userName}?`}
              ref={textAreaRef}
            ></textarea>
            {vidPrev && (
              <video
                className={`h-96 w-full ${className}`}
                ref={vidRef}
                height={675}
                width={1200}
                controls
                muted
                onPlay={() => {
                  setClassName("object-contain");
                }}
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
          <button
            disabled={loading}
            className={`${
              loading ? "bg-blue-500/80" : "bg-blue-500 hover:bg-blue-600"
            } mt-1 w-full rounded p-1 text-sm text-white`}
            type="submit"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
