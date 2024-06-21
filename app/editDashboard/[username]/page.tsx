import EditProfile from "@/components/EditProfileDashboard";
import "react-image-crop/dist/ReactCrop.css";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getUser = async (username: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${username}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const user = await res.json();
      return user;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
async function EditDasboard({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const username = params.username;
  const user = await getUser(username);
  return <>{user ? <EditProfile user={user} /> : <div>User not found</div>}</>;
}

export default EditDasboard;
