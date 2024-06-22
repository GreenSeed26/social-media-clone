import { getServerSession } from "next-auth";
import RegisterForm from "../../components/RegisterForm";
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
  title: `Sign Up`
}};


async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <main className="flex h-[90dvh] w-full items-center justify-center">
      <RegisterForm />
    </main>
  );
}

export default Login;
