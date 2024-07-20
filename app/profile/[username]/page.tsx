import DashboardProfile from "@/components/Dashboard/DasboardProfile";
import NoPost from "@/components/Dashboard/NoPost";
import PostBody from "@/components/FeedComponents/PostBody";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const generateMetadata = ({
  params,
}: {
  params: {
    username: string;
  };
}): Metadata => {
  return {
    title: `${params.username}`,
  };
};

async function Dashboard({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const { username } = params;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  let post: any[] = [];

  post = await prisma.post.findMany({
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
          Comment: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto w-[40rem] max-sm:w-full">
      <DashboardProfile user={user} />
      {post.length ? (
        post.map((post) => <PostBody key={post.id} post={post} />)
      ) : (
        <NoPost />
      )}
    </div>
  );
}

export default Dashboard;
