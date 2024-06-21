"use client";

import { useEffect, useState } from "react";
import defaultIcon from "../public/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png";
import SkeletonUI from "./SkeletonUI";
import Image from "next/image";
import { convertToLocaleString } from "@/lib/convertDate";
import Link from "next/link";
import { AlertCircle, Bookmark, Code, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
// import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface Posts {
  id: string;
  postBody: string;
  postImage: string;
  authorImage: string;
  authorId: string;
  createdAt?: string;
  updatedAt?: string;
}

function PostBody() {
  const [posts, setPosts] = useState<Posts[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
        setError("failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      <div>
        {error && <p className="py-4 text-red-500">{error}</p>}
        {loading ? (
          <>
            <SkeletonUI />
          </>
        ) : (
          <div>
            {posts?.map((p) => (
              <div
                key={p.id}
                className="mx-auto mt-6 w-[440px] rounded border py-2 max-phones:w-full max-phones:rounded-none"
              >
                <div className="flex items-center px-2">
                  <Link
                    href={`/${p.authorId}`}
                    className="size-12 cursor-pointer hover:opacity-85 "
                  >
                    <Image
                      src={!p.authorImage ? defaultIcon : p.authorImage}
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                  </Link>
                  <div className="ml-2 flex flex-col">
                    <Link
                      className=" cursor-pointer text-sm font-bold hover:underline"
                      href={`/${p.authorId}`}
                    >
                      {p.authorId}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {convertToLocaleString(p.createdAt as string)}
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
                  <span className="whitespace-pre-wrap text-sm">
                    {p.postBody}
                  </span>
                  {/* {p.postImage && <Image src={p.postImage} alt="" />} */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PostBody;
