import defaultIcon from "../public/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png";
import SkeletonUI from "./SkeletonUI";
import Image from "next/image";
import { convertToLocaleString } from "@/lib/convertDate";
import Link from "next/link";
import useSWR from "swr";
import PostInteraction from "./PostInteraction";
import DdButton from "./DdButton";
import Carousel from "./Carousel";
import VidComponent from "./VidComponent";
import { Post as PostType, User } from "@prisma/client";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
};

function PostBody({ post }: { post: FeedPostType }) {
  return (
    <>
      <div
        key={post.id}
        className="mx-auto mt-6 w-[440px] overflow-hidden rounded border py-2 max-phones:w-full max-phones:rounded-none"
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
              {convertToLocaleString(post.createdAt as unknown as string)}
            </span>
          </div>
          <div className="ml-auto cursor-pointer rounded-full p-1 hover:bg-gray-200">
            <DdButton />
          </div>
        </div>
        <div className="flex w-full flex-col overflow-hidden px-2 pt-4">
          {post.postBody && (
            <span className="whitespace-pre-wrap text-sm">{post.postBody}</span>
          )}
          <VidComponent video={post.postVideo} />
          <Carousel images={post.postImage} />
        </div>
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
        />
      </div>
    </>
  );
}

export default PostBody;
