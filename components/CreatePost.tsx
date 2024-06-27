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

type SessionProp = {
  userName?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePost = ({ userName, open, setOpen }: SessionProp) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [post, setPost] = useState("");
  const [textLength, setTextLength] = useState(false);
  const [imgPrev, setImgPrev] = useState<string>("");
  const [imgFile, setImgFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();

  const getImage = (data: string, file?: File) => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!post && !imgFile) {
      return alert("Empty Fields");
    }

    setLoading(true);

    try {
      let postImage = "";

      if (imgFile) {
        const res = await edgestore.myPublicImages.upload({ file: imgFile });
        postImage = res.url;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postBody: post, postImage }),
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
        <form onSubmit={handleSubmit} className="w-full">
          <div className="textarea-scroll w-full h-auto overflow-y-auto">
            <textarea
              value={post}
              onChange={handleText}
              className="h-auto w-full resize-none text-sm whitespace-pre-wrap outline-none"
              placeholder={`What's on your mind, ${userName}?`}
              ref={textAreaRef}
            ></textarea>
            {imgPrev && (
              <div className="relative w-full h-80">
                <Image
                  src={imgPrev}
                  alt="imgPostPrev"
                  height={1500}
                  width={1500}
                />
              </div>
            )}
          </div>

          <div className="m-2 flex justify-between">
            <ImageInput getImage={getImage} />
            <VideoInput />
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
