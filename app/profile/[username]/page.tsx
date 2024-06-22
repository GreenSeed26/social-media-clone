import { UserInfo } from "@/app/types";
import DashboardProfile from "@/components/DasboardProfile";
import { authOptions } from "@/lib/auth";
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
}): Metadata => {return {
  title: `${params.username}`
}};

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
  const res = await fetch(`${process.env.API_URL}/api/user/${username}`, {
    cache: "no-store",
  });
  const user: UserInfo = await res.json();

  return (
    <div className="mx-auto w-[40rem] max-sm:w-full">
      <DashboardProfile user={user.user} />
    </div>
  );
}

export default Dashboard;
