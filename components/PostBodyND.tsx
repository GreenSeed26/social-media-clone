import NextImage from "next/image";
import defaultIcon from "../public/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png";
import { Heart, MessageCircle, Share2Icon } from "lucide-react";
function PostBodyND() {
  return (
    <div className="mx-auto my-6 w-[400px] rounded-lg border py-1">
      <div className="flex items-center border-b pb-1 pl-2">
        <NextImage
          src={defaultIcon}
          alt=""
          className="size-8 rounded-full object-cover ring-2"
        />
        <span className="ml-2.5 text-sm font-semibold">Name</span>
      </div>
      <div className="px-2 pb-1 pt-2">
        <span className="whitespace-pre-wrap text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim fugit
          eum labore corrupti nihil porro iste neque rem sunt. A tenetur quaerat
          magnam nemo cupiditate sed debitis deleniti pariatur assumenda?
        </span>
      </div>
      {/* <img
        src="https://files.edgestore.dev/m4ec7ji7i6g7jiuy/myPublicImages/_public/11ea86e6-1fc8-4501-9c1e-5d8ec97c11c7.image"
        alt=""
      /> */}
      <div className="flex items-center justify-evenly border-t py-1">
        <div className="flex cursor-pointer items-center rounded px-2 py-1 hover:bg-gray-200">
          <Heart size={20} />
          <span className="ml-1 text-sm font-semibold">Like</span>
        </div>
        <div className="flex cursor-pointer items-center rounded px-2 py-1 hover:bg-gray-200">
          <MessageCircle size={20} />
          <span className="ml-1 text-sm font-semibold">Comment</span>
        </div>
        <div className="flex cursor-pointer items-center rounded px-2 py-1 hover:bg-gray-200">
          <Share2Icon size={20} />
          <span className="ml-1 text-sm font-semibold">Share</span>
        </div>
      </div>
    </div>
  );
}

export default PostBodyND;
