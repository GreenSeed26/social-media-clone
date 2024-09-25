import HomePage from "@/components/HomePage";
import Post from "@/components/FeedComponents/Post";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SkeletonUI from "@/components/SkeletonUI";
import prisma from "@/lib/db";
import { serverSession } from "@/lib/session";
import SideBar from "@/components/FeedComponents/SideBar";
import Experiment from "@/components/Experimental/Experiment";

export default async function Home() {
  const { session, username } = await serverSession();

  if (!session) {
    redirect("/login");
  }

  const user: any = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-2 ">
        <section className="flex w-full min-w-0 lg:gap-4">
          <SideBar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
          <article className="flex w-full flex-col items-center max-sm:w-screen">
            <HomePage user={user} />
            <Suspense fallback={<SkeletonUI />}>
              {/* <Post /> */}
              <Experiment />
            </Suspense>
          </article>
          <SideBar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-96" />
        </section>
      </div>
      {/* <SideBar
                  className="sticky bottom-0 w-full border-t bg-white p-2 sm:hidden"
                  childCn="rounded-md flex flex-row items-center justify-center bg"
                /> */}
    </>
  );
}
