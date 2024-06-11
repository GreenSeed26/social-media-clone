import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import prisma from "@/lib/db";

async function Navbar() {
  const session = await getServerSession(authOptions);
  const currUser = session?.user.email + "";

  const user = await prisma.user.findUnique({
    where: {
      email: currUser,
    },
    select: {
      image: true,
    },
  });

  const pfp = user?.image as string;

  return (
    <header className="sticky top-0 z-10 w-full border-b border-s-zinc-200 bg-zinc-100 py-1">
      <nav className="mx-2 my-1 flex items-center justify-between">
        <Link href={"/"}>Home</Link>

        {session?.user ? (
          <ProfileIcon pfp={pfp} username={session.user.username as string} />
        ) : (
          <Link
            className="rounded bg-black p-1 text-sm text-white"
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
