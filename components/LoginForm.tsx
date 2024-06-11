"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Google from "../public/google-icon.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const signInData = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInData?.error) {
        console.log(signInData.error);

        setIsLoading(false);
        toast({
          title: "Error",
          description:
            "Invalid Credentials. Email or password may have been recently changed",
          variant: "destructive",
        });
        return;
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <div className="h-fit w-96 border p-5">
      {/* <div className="">
        <label
          onClick={() => signIn("google")}
          className="flex h-10 w-full cursor-pointer items-center justify-center rounded bg-primary hover:bg-primary/90"
        >
          <Image src={Google} alt="" height={20} width={20} />
          <span className="ml-2 font-semibold text-white">
            Sign In with Google
          </span>
        </label>
        <Separator className="my-4" />
      </div> */}
      <form onSubmit={loginUser} className="flex flex-col">
        <label className="m-1 text-sm font-bold">Email</label>
        <input
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          type="text"
          className="h-10 rounded-lg border px-2 text-sm outline-none"
        />
        <label className="m-1 text-sm font-bold">Password</label>
        <input
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          type="password"
          className="h-10 rounded-lg border px-2 text-sm outline-none"
        />

        <button
          className={`my-5 h-10 w-fit rounded-lg ${loading ? "bg-primary/80" : "bg-primary hover:bg-primary/90"} px-4 text-sm font-semibold text-white `}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>

        <div className="text-sm">
          Don&apos;t have an account?{" "}
          <Link className="text-zinc-500 underline " href={"/register"}>
            Sign Up here!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
