"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./db";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

export const switchLike = async (postId: string) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;

  if (!userId) throw new Error("User not found");

  try {
    const existingLike = await prisma.likes.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.likes.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.likes.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!username || !email || !password) return;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hashPassword = await hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });
  } catch (error) {
    console.log(error);
  }
  redirect("/login");
};

export const createPost = async (
  postBody?: string,
  vidUrl?: string,
  imgUrl?: string[],
) => {
  "use server";
  const session = await getServerSession(authOptions);

  // if (!postBody || !vidUrl || !imgUrl) {
  //   console.log("no input");
  //   return
  // }

  const userId = session?.user.id as string;
  try {
    const post = await prisma.post.create({
      data: {
        author: { connect: { id: userId } },
        postBody,
        postVideo: vidUrl,
        postImage: imgUrl,
      },
    });
    console.log(post);
  } catch (error) {
    console.log(error);
  }
};
