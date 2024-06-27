import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const id = params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { postBody, postLike } = await req.json();

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        postBody,
      },
    });
    return NextResponse.json({ post });
  } catch (error) {
    console.log(error);
  }
}
