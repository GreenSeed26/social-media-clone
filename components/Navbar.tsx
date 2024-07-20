import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import prisma from "@/lib/db";
import { HomeIcon, LucideUserRound, Mails } from "lucide-react";

async function Navbar() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id || "",
    },
  });

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-zinc-100 py-1">
      <nav className="mx-2 my-1 flex items-center justify-between">
        <h1 className="font-bold">ThinkHUB</h1>
        <div className="flex justify-between gap-10 px-10">
          <Link href={"/"}>
            <HomeIcon size={20} />
          </Link>
          <Link href={"/chatrooms"}>
            <Mails size={20} />
          </Link>
          <Link href={"/pages"}>
            <LucideUserRound size={20} />
          </Link>
        </div>

        {user ? (
          <>
            <ProfileIcon user={user} />
          </>
        ) : (
          <Link
            className=" rounded bg-black p-1 text-sm text-white"
            href={"/login"}
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
