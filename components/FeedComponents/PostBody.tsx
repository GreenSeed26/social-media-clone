import defaultIcon from "@/public/default_icon.png";
import NextImage from "next/image";
import { convertToLocaleString } from "@/lib/convertDate";
import Link from "next/link";
import { PostInteraction } from "./PostInteraction";
import DdButton from "../DdButton";
import Carousel from "./Carousel";
import VidComponent from "./VidComponent";
import { Post as PostType, User } from "@prisma/client";
import Comment from "./Comment";
import { getRtf } from "@/lib/helper";

type FeedPostType = PostType & { author: User } & {
  likes: [{ userId: string }];
} & {
  _count: {
    Comment: number;
  };
};

function PostBody({ post }: { post: FeedPostType }) {
  return (
    <>
      <div
        key={post.id}
        className="mx-auto mt-6 w-[480px] overflow-hidden rounded border py-2 max-phones:w-full max-phones:rounded-none"
      >
        <div className="flex items-center px-2">
          <Link
            href={`/${post.author.username}`}
            className="size-8 cursor-pointer hover:opacity-85"
          >
            <NextImage
              src={post.author.image || defaultIcon}
              alt=""
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          </Link>
          <div className="ml-2 flex flex-col">
            <Link
              className="cursor-pointer text-sm font-bold hover:underline"
              href={`/${post.author.username}`}
            >
              {post.author.username}
            </Link>
            <span className="text-xs text-muted-foreground">
              {getRtf(post.createdAt)}
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
          comments={post._count.Comment}
        />
        <Comment postId={post.id} />
      </div>
    </>
  );
}

export default PostBody;
