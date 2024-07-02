import HomePage from "@/components/HomePage";
import Post from "@/components/Post";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { UserInfo } from "./types";
import SkeletonUI from "@/components/SkeletonUI";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.API_URL}/api/user/${session?.user?.username}`,
    {
      cache: "no-store",
    },
  );

  const userData: UserInfo = await res.json();

  return (
    <>
      <HomePage user={userData.user} />
      <Suspense fallback={<SkeletonUI />}>
        <Post />
      </Suspense>
    </>
  );
}
