import { UserInfo } from "@/app/types";
import DashboardProfile from "@/components/DasboardProfile";
import { authOptions } from "@/lib/auth";
import { getUser } from "@/lib/helper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type UserProfileLayoutProps = {
  params: {
    username: string;
  };
  children: ReactNode;
};

async function UserProfileLayout({ params, children }: UserProfileLayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else if (params.username != session.user.username) {
    //route user back to previous page or prevent user from routing to this page
    redirect(`/profile/${session.user.username}`);
  }
  const username = params.username;
  const user: UserInfo = await getUser(username);

  return (
    <div className="mx-auto w-[40rem] max-sm:w-full">
      <DashboardProfile user={user.user} />
      {children}
    </div>
  );
}

export default UserProfileLayout;
