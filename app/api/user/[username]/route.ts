import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { username: string } }
) {
  const { username, email, image, bannerImage, bio } = await req.json();
  const userName = params.username;

  try {
    const user = await prisma.user.update({
      where: { username: userName },
      data: {
        username,
        email,
        image,
        bannerImage,
        bio,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const id = params.username;
    const user = await prisma.user.findUnique({
      where: {
        username: id,
      },
      include: {
        post: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
