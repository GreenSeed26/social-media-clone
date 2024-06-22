import EditProfile from "@/components/EditProfileDashboard";
import "react-image-crop/dist/ReactCrop.css";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserInfo, UserProps } from "@/app/types";
import { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: {
    username: string;
  };
}): Metadata => {
  return {
    title: 'Edit',
  };
};

async function EditDasboard({ params }: { params: { username: string } }) {
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
    <>
      {user ? <EditProfile userData={user.user} /> : <div>User not found</div>}
    </>
  );
}

export default EditDasboard;
