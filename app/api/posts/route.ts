import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const id = session?.user.username as string;

  const { postBody, postImage, postVideo } = await req.json();

  try {
    const post = await prisma.post.create({
      data: {
        author: {
          connect: { username: id },
        },
        postBody,
        postImage,
        postVideo,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(posts);
}
