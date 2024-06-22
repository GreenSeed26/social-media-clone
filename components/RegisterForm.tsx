"use client";

import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const usedEmail = "sample@email.com";


function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setIsLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();
  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    //checks if all fields are empty

    try {
      if (!username || !email || !password) {
        toast({
          title: "Error",
          description: "All fields cannot be empty",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      //checks if password matches
      if (password !== confirmPass) {
        toast({
          title: "Error",
          description: "All passwords must match",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      const resExist = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userExist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resExist.json();

      if (user) {
        toast({
          title: "Error",
          description: "User already exists",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        router.push("/login");
        router.refresh();
        toast({
          title: "Success",
          description: "Account successfully created",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-fit w-96 border p-5">
      <form onSubmit={register} className="flex flex-col">
        <label className="m-1 text-sm font-bold">Username</label>
        <input
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          type="text"
          className="h-10 rounded-lg border px-2 text-sm outline-none"
        />
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
        <label className="m-1 text-sm font-bold">Confirm Password</label>
        <input
          value={confirmPass}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPass(e.target.value)
          }
          type="password"
          className="h-10 rounded-lg border px-2 text-sm outline-none"
        />

        <button
          className={`my-5 h-10 w-fit rounded-lg ${loading ? "bg-primary/80" : "bg-primary hover:bg-primary/90"} px-4 text-sm font-semibold text-white `}
        >
          {loading ? "Registering..." : "Register"}
        </button>
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
