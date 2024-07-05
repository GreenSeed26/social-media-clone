import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import { UserInfo } from "@/app/types";

async function Navbar() {
  const session = await getServerSession(authOptions);
  const currUser = session?.user.username;

  const res = await fetch(`${process.env.API_URL}/api/user/${currUser}`);
  const userData: UserInfo = await res.json();

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-zinc-100 py-1 dark:bg-zinc-800 dark:border-b-zinc-600 ">
      <nav className="mx-2 my-1 flex items-center justify-between">
        <Link href={"/"}>Home</Link>

        {session?.user ? (
          <ProfileIcon user={userData.user} />
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
