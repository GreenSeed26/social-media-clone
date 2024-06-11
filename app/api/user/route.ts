import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, image, bannerImage, bio } = body;

    const hashpass = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashpass,
        image: '',
        bannerImage: '',
        bio: ''
      },
    });

    return NextResponse.json(
      { user: newUser, message: "user created" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: error },
      { status: 500 },
    );
  }
}

export async function GET() {
  const users = await prisma.user.findMany({ include: { post: true } });

  return NextResponse.json(users);
}
