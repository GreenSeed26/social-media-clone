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

type SessionProp = {
  userName?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreatePost({ userName, open, setOpen }: SessionProp) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [post, setPost] = useState("");
  const [textLength, setTextLength] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [imgSrc, setImgSrc] = useState("");
  const [postImg, setPostImg] = useState<string>();
  const { edgestore } = useEdgeStore();

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setPost(newText);
    setTextLength(newText.length >= 100);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height to auto
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
      if (textAreaRef.current.clientHeight > 288) {
        textAreaRef.current.style.overflowY = "auto";
        textAreaRef.current.style.height = "288px";
      }
    }
  }, [post]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!post) return alert("Empty Fields");

    setLoading(true);

    if (imageFile) {
      const res = await edgestore.myPublicImages.upload({ file: imageFile });

      setPostImg(res.url);
    }
    console.log(postImg);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postBody: post }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        throw new Error("Shakawaga");
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
    <>
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
        <DialogContent className="w-[500px] max-phones:w-96">
          <X
            size={20}
            className="absolute right-0 -translate-x-4 translate-y-4 focus:outline"
            onClick={() => setOpen(false)}
          />
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>{userName}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div
              className={`textarea-scroll ${imgSrc && "h-56"} overflow-y-auto`}
            >
              <textarea
                value={post}
                onChange={handleText}
                className="max-h-72 min-h-10 w-full resize-none text-sm whitespace-pre-wrap outline-none"
                placeholder={`What's on your mind, ${userName}? `}
                ref={textAreaRef}
              ></textarea>

              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt=""
                  height={100}
                  width={200}
                  className="size-auto"
                />
              )}
            </div>
            <div className="m-2 flex justify-between">
              <input type="file" accept="image/*" id="images" hidden />
              <label
                // htmlFor="images"
                className="mx-1 flex w-full items-center justify-center gap-1 rounded p-1 hover:bg-gray-200"
                onClick={() => alert("This feature is currently in the works")}
              >
                <ImageIcon size={20} className="text-blue-400" />
                <span className="text-sm">Photo</span>
              </label>

              <input type="file" accept="video/*" id="video" hidden />
              <label
                // htmlFor="video"
                className="mx-1 flex w-full items-center justify-center gap-1 rounded p-1 hover:bg-gray-200"
                onClick={() => alert("This feature is currently in the works")}
              >
                <VideoIcon size={20} className=" text-rose-500" />
                <span className="text-sm ">Video</span>
              </label>
            </div>
            <button
              disabled={loading}
              className={`${loading ? "bg-blue-500/80" : "bg-blue-500 hover:bg-blue-600"} mt-1 w-full rounded  p-1 text-sm text-white `}
              type="submit"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreatePost;
