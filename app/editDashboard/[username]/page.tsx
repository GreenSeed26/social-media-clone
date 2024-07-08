import EditProfile from "@/components/Dashboard/EditProfileDashboard";
import "react-image-crop/dist/ReactCrop.css";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserInfo, UserProps } from "@/app/types";
import { Metadata } from "next";
import prisma from "@/lib/db";

export const generateMetadata = ({
  params,
}: {
  params: {
    username: string;
  };
}): Metadata => {
  return {
    title: "Edit",
  };
};

async function EditDasboard({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { username } = params;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return (
    <>{user ? <EditProfile userData={user} /> : <div>User not found</div>}</>
  );
}

export default EditDasboard;
