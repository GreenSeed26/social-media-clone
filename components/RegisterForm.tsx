"use client";

import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/lib/actions";
import Link from "next/link";
import RegSubBtn from "./RegSubBtn";
function RegisterForm() {
  const { toast } = useToast();

  const register = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!username || !email || !password) {
      toast({
        title: "Invalid",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Invalid",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      await registerUser(formData);
      toast({
        title: "Success",
        description: "Account created successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-fit w-96 border p-5">
      <form action={register} className="flex flex-col">
        <label className="m-1 text-sm font-bold">Username</label>
        <input
          type="text"
          name="username"
          className="h-10 rounded-lg border px-2 text-sm outline-none "
        />
        <label className="m-1 text-sm font-bold">Email</label>
        <input
          type="text"
          name="email"
          className="h-10 rounded-lg border px-2 text-sm outline-none "
        />
        <label className="m-1 text-sm font-bold">Password</label>
        <input
          type="password"
          name="password"
          className="h-10 rounded-lg border px-2 text-sm outline-none "
        />
        <label className="m-1 text-sm font-bold">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="h-10 rounded-lg border px-2 text-sm outline-none "
        />
        <RegSubBtn />
        <div className="text-sm">
          Already Have an account?{" "}
          <Link className="text-zinc-500 underline " href={"/login"}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
