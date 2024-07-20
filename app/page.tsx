import HomePage from "@/components/HomePage";
import Post from "@/components/FeedComponents/Post";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { UserInfo } from "./types";
import SkeletonUI from "@/components/SkeletonUI";
import prisma from "@/lib/db";
import Friends from "@/components/Aside/Friends";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  const username = session?.user?.username;

  const user: any = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const users = await prisma.user.findMany();

  return (
    <>
      <section className="gap-8 lg:flex">
        <aside className="relative hidden w-full lg:block">Menu</aside>
        <article className="">
          <HomePage user={user} />
          <Suspense fallback={<SkeletonUI />}>
            <Post />
          </Suspense>
        </article>
        <aside className="hidden w-full lg:block">
          <Friends user={users} />
        </aside>
      </section>
    </>
  );
}
