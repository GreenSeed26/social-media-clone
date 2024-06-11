import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: { id: true },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
