import { User } from "@prisma/client";
import React from "react";
import Image from "next/image";

function Friends({ user }: { user: User[] }) {
  return (
    <>
      {user.map((user) => (
        <div className="flex items-center gap-2 border-l border-b p-1 " key={user.id}>
          <Image
            src={user.image || "/default_icon.png"}
            alt=""
            width={40}
            height={40}
            className="size-8 rounded-full"
          />
          <span className="text-xs">{user.username}</span>
        </div>
      ))}
    </>
  );
}

export default Friends;
