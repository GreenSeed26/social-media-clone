import DisplayProfile from "@/components/DisplayProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";
import { Metadata } from "next";
export const generateMetadata = ({
  params,
}: {
  params: {
    username: string;
  };
}): Metadata => {return {
  title: `${params.username}`
}};


async function ProfilePage({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);
  const username = params.username;
  const currentSession = session?.user.username;

  if (!session) {
    redirect("/login");
  } else if (currentSession === username) {
    redirect(`/profile/${username}`);
  }

  const res = await fetch(`${process.env.API_URL}/api/user/${username}`, {
    cache: "no-store",
  });

  const user = await res.json();

  return (
    <div className="mx-auto w-[40rem] min-w-0 max-sm:w-full">
      <DisplayProfile user={user} />
    </div>
  );
}

export default ProfilePage;
