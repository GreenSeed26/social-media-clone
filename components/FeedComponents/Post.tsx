import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import React from "react";
import PostBody from "./PostBody";

async function Post({ username }: { username?: string }) {
  let posts: any[] = [];
  {
    posts = await prisma.post.findMany({
      where: {
        author: {
          username,
        },
      },
      include: {
        author: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <>
      {posts.length
        ? posts.map((post) => <PostBody key={post.id} post={post} />)
        : "No posts found"}
    </>
  );
}

export default Post;
