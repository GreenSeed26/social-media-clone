import DisplayProfile from "@/components/Dashboard/DisplayProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/db";
import PostBody from "@/components/FeedComponents/PostBody";
import NoPost from "@/components/Dashboard/NoPost";
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

async function ProfilePage({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);
  const username = params.username;
  const currentSession = session?.user.username;

  if (!session) {
    redirect("/login");
  } else if (currentSession === username) {
    redirect(`/profile/${username}`);
  }

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
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto w-[40rem] min-w-0 max-sm:w-full">
      <DisplayProfile user={user} />
      {post.length ? (
        post.map((post) => <PostBody key={post.id} post={post} />)
      ) : (
        <NoPost />
      )}
    </div>
  );
}

export default ProfilePage;
