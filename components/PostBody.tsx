"use client";

import { useRef, useState, useEffect } from "react";
import defaultIcon from "../public/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png";
import SkeletonUI from "./SkeletonUI";
import Image from "next/image";
import { convertToLocaleString } from "@/lib/convertDate";
import Link from "next/link";
import {
  AlertCircle,
  Bookmark,
  Code,
  Maximize,
  MoreVertical,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useSWR from "swr";
import PostInteraction from "./PostInteraction";

type Posts = {
  id: string;
  postBody: string;
  postImage: string;
  postVideo: string;
  likes: string[];
  authorImage: string;
  authorId: string;
  createdAt?: string;
  updatedAt?: string;
};

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function PostBody() {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [mutedVideoId, setMutedVideoId] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const { data, error, isLoading } = useSWR<Posts[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (playingVideoId) {
      const video = videoRefs.current.find(
        (video) => video.dataset.id === playingVideoId,
      );
      if (video) {
        video.play();
      }
    }
  }, [playingVideoId]);

  if (error) return <h1>Error fetching data</h1>;
  if (isLoading) return <SkeletonUI />;

  const handleTimeUpdate = (
    id: string,
    currentTime: number,
    duration: number,
  ) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [id]: (currentTime / duration) * 100,
    }));
  };

  const handlePlayPause = (id: string) => {
    const video = videoRefs.current.find((video) => video.dataset.id === id);

    if (playingVideoId === id) {
      if (video?.paused) {
        video.play();
      } else {
        video?.pause();
        setPlayingVideoId(null);
      }
    } else {
      videoRefs.current.forEach((video) => video.pause());
      video?.play();
      setPlayingVideoId(id);
    }
  };

  const handleMuteUnmute = (id: string) => {
    const video = videoRefs.current.find((video) => video.dataset.id === id);

    if (mutedVideoId === id) {
      video!.muted = true;
      setMutedVideoId(null);
    } else {
      videoRefs.current.forEach((video) => (video.muted = true));
      video!.muted = false;
      setMutedVideoId(id);
    }
  };

  return (
    <>
      <div>
        <div>
          {data?.map((post, index) => (
            <div
              key={post.id}
              className="mx-auto mt-6 w-[440px] rounded border py-2 max-phones:w-full max-phones:rounded-none"
            >
              <div className="flex items-center px-2">
                <Link
                  href={`/${post.authorId}`}
                  className="size-8 cursor-pointer hover:opacity-85"
                >
                  <Image
                    src={!post.authorImage ? defaultIcon : post.authorImage}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </Link>
                <div className="ml-2 flex flex-col">
                  <Link
                    className="cursor-pointer text-sm font-bold hover:underline"
                    href={`/${post.authorId}`}
                  >
                    {post.authorId}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {convertToLocaleString(post.createdAt as string)}
                  </span>
                </div>
                <div className="ml-auto cursor-pointer rounded-full p-1 hover:bg-gray-200">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center outline-none">
                      <MoreVertical size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Bookmark size={15} />
                        <span>Save Post</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Code size={15} />
                        <span>Embed Post</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2">
                        <AlertCircle size={15} />
                        <span>Report Post</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="px-2 pt-4">
                {post.postBody && (
                  <span className="whitespace-pre-wrap text-sm">
                    {post.postBody}
                  </span>
                )}

                {post.postVideo && (
                  <div className="group relative overflow-hidden">
                    <video
                      className="h-96 w-full rounded bg-black object-contain"
                      ref={(el) => {
                        if (el && !videoRefs.current.includes(el)) {
                          videoRefs.current[index] = el;
                        }
                      }}
                      data-id={post.id}
                      height={675}
                      width={1200}
                      onTimeUpdate={(e) => {
                        const video = e.currentTarget;
                        handleTimeUpdate(
                          post.id,
                          video.currentTime,
                          video.duration,
                        );
                      }}
                      onEnded={() => setPlayingVideoId(null)}
                      muted
                    >
                      <source src={post.postVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-0 flex h-8 w-full translate-y-8 items-center gap-2 rounded-b bg-gradient-to-t from-black to-white/0 px-2 transition-all group-hover:translate-y-0">
                      <button onClick={() => handlePlayPause(post.id)}>
                        {playingVideoId === post.id ? (
                          <Pause size={18} fill="white" color="white" />
                        ) : (
                          <Play size={18} fill="white" color="white" />
                        )}
                      </button>
                      <button onClick={() => handleMuteUnmute(post.id)}>
                        {mutedVideoId === post.id ? (
                          <Volume2 size={18} fill="white" color="white" />
                        ) : (
                          <VolumeX size={18} fill="white" color="white" />
                        )}
                      </button>

                      <div className="relative mx-1.5 flex h-1 flex-1 items-center rounded-full bg-gray-400/20">
                        <div className="bg-[rgb(1, 1, 65)] w-full">
                          <div
                            className="absolute top-0 h-full rounded-full bg-white/60 transition-all"
                            style={{ width: `${progress[post.id] || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {post.postImage && (
                  <div className="relative">
                    <Image
                      src={post.postImage}
                      alt=""
                      width={1500}
                      height={1500}
                      className="h-auto w-full rounded"
                    />
                  </div>
                )}
              </div>
              <PostInteraction postId={post.id} likes={post.likes} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PostBody;
