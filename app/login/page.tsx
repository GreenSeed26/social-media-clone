import React from "react";
import LoginForm from "../../components/LoginForm";
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
}): Metadata => {
  return {
    title: { absolute: "Welcome to ThinkHub" },
  };
};

async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <main className="flex h-[90dvh] w-full items-center justify-center">
      <LoginForm />
    </main>
  );
}

export default Login;
