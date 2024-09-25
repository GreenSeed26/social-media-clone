"use client";
import { useEffect, useRef, useState } from "react";
import { PostButton } from "../FormButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/actions";
import Image from "next/image";
import { useEdgeStore } from "@/lib/edgestore";
import { useToast } from "../ui/use-toast";
import Carousel from "../FeedComponents/Carousel";
import { X } from "lucide-react";
import { ImageInput, VideoInput } from "../FeedComponents/VideoAndImage";
import { PostVar } from "@/app/types";

function CreatePost({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const [imgPrev, setImgPrev] = useState<string[]>([]);
  const [imgFile, setImgFile] = useState<File[]>([]);
  const [vidPrev, setVidPrev] = useState<string>("");
  const [vidFile, setVidFile] = useState<File | undefined>();
  const { edgestore: es } = useEdgeStore();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  useEffect(() => {
    const handleInput = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto"; // Reset height to auto
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        if (textAreaRef.current.clientHeight > 288) {
          textAreaRef.current.style.overflowY = "auto";
          textAreaRef.current.style.height = "288px";
        }
      }
    };

    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.addEventListener("input", handleInput);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("input", handleInput);
      }
    };
  }, []);

  const getImage = (data: string[], file: File[]) => {
    setImgPrev(data);
    setImgFile(file);
  };

  const getVideo = (data: string, file?: File) => {
    setVidPrev(data);
    setVidFile(file);
  };
  const { mutateAsync: addPost } = useMutation({
    mutationFn: (variables: PostVar) => createPost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    mutationKey: ["posts"],
  });

  const handleUpload = async (fd: FormData) => {
    const postBody = fd.get("postBody") as string;
    let vidUrl = "";
    let imgUrl: string[] = [];

    for (let i = 0; i < imgFile.length; i++) {
      const res = await es.myPublicImages.upload({
        file: imgFile[i],
        options: { temporary: true },
      });
      imgUrl.push(res.url);
    }

    if (vidFile) {
      const res = await es.myPublicFiles.upload({
        file: vidFile,
        options: { temporary: true },
      });

      vidUrl = res.url;
    }
    if (postBody.trim() == "" && !vidUrl && !imgUrl) {
      setOpen(false);
      return;
    }
    try {
      await addPost(
        { postBody, imgUrl, vidUrl },
        {
          onSuccess(data, variables, context) {
            console.log(variables);
          },
          onError() {
            return;
          },
        },
      );
      formRef.current?.reset();
      setOpen(false);
      if (imgUrl.length > 0) {
        for (let i = 0; i < imgUrl.length; i++) {
          await es.myPublicImages.confirmUpload({ url: imgUrl[i] });
        }
      }
      if (vidUrl) {
        await es.myPublicFiles.confirmUpload({ url: vidUrl });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form ref={formRef} action={handleUpload} className="flex flex-col">
      <div className="textarea-scroll max-h-96 w-full overflow-hidden overflow-y-scroll">
        <textarea
          ref={textAreaRef}
          className="h-auto  w-full resize-none whitespace-pre-wrap text-sm outline-none"
          name="postBody"
          placeholder={`What's on your mind, ${"placeholder"}?`}
        ></textarea>
        {imgPrev.length > 0 && (
          <div className="flex aspect-square w-full flex-col items-center justify-center rounded-lg">
            <Carousel images={imgPrev} />
          </div>
        )}

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
        {/* {imgPrev.length > 0 && (
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
        )} */}
      </div>

      <div className="m-2 flex justify-between">
        <ImageInput getImage={getImage} />
        <VideoInput getVideo={getVideo} />
      </div>
      <PostButton />
    </form>
  );
}

export default CreatePost;
