import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const id = session?.user.username as string;

  const { postBody, postImage, postVideo } = await req.json();

  const user = await prisma.user.findFirst({
    where: { username: id },
    select: {
      username: true,
      image: true,
    },
  });

  try {
    const post = await prisma.post.create({
      data: {
        authorId: user?.username as string,
        authorImage: user?.image as string,
        postBody,
        postImage,
        postVideo,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
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
