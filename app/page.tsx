import HomePage from "@/components/HomePage";
import PostBody from "@/components/PostBody";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export default async function Home() {
  const session = await getServerSession(authOptions);
  const userName = session?.user.username;

  if(!session) {
    redirect('/login')
  }

  console.log(session)

  const pfp = await prisma.user.findFirst({
    where: { username: userName },
    select: { image: true },
  });

  return (
    <>
      <HomePage pfp={pfp?.image as string} username={userName as string} />
      <Suspense fallback>
        <PostBody />
      </Suspense>
    </>
  );
}
