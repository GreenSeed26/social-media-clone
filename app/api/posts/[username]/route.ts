import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      username: string;
    };
  },
) {
  const username = params.username;

  try {
    const post = await prisma.post.findMany({
      where: { authorId: username },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ messge: "error updating profile picture" });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { username: string } },
) {
  const { authorImage } = await req.json();
  const username = params.username;

  try {
    const post = await prisma.post.updateMany({
      where: { authorId: username },
      data: {
        authorImage,
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.log(error);
  }
}
