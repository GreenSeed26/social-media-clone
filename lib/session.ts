import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function serverSession() {
  "use server";
  const session = await getServerSession(authOptions);

  return {
    session,
    ...session?.user,
  };
}
