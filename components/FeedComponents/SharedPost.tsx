import Image from "next/image";

function SharedPost({
  postId,
  postBody,
  postImage,
  author,
  authorImage,
}: {
  postId: string;
  postBody: string;
  postImage: string;
  author: string;
  authorImage: string;
}) {
  return (
    <div className="w-full border mt-1 p-2 rounded flex flex-col gap-2">
      <div className="flex items-center">
        <Image
          src={authorImage || "/default_icon.png"}
          alt=""
          width={100}
          height={100}
          className="size-8 rounded-full object-cover"
        />
        <span className="text-sm font-semibold ml-1">{author}</span>
      </div>

      <div className="flex flex-col p-2 gap-2">
        {postBody && (
          <p className="text-xs w-full whitespace-break-spaces">{postBody}</p>
        )}
        {postImage && (
          <Image
            src={postImage}
            width={900}
            height={900}
            alt=""
            className={`${!postImage ? "size-full" : "size-full"} aspect-square flex-1 rounded object-cover`}
          />
        )}
      </div>
    </div>
  );
}

export default SharedPost;
