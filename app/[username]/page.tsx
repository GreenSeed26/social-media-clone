import DisplayProfile from "@/components/DisplayProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardProfile from "@/components/DasboardProfile";
import { UserInfo } from "../types";
import { getUser } from "@/lib/helper";
import { redirect } from "next/navigation";

async function ProfilePage({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);
  const username = params.username;
  const user: UserInfo = await getUser(username);
  const currentSession = session?.user.username;

  if (currentSession == user.user.username) {
    redirect(`/profile/${currentSession}`);
  }

  return (
    <div className="mx-auto w-[40rem] min-w-0 max-sm:w-full">
      <DisplayProfile user={user} />
    </div>
  );
}

export default ProfilePage;
