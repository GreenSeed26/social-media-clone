"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./db";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

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

  revalidatePath("/");
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
  const session = await getServerSession(authOptions);

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
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
};

export const updateProfile = async (
  username?: string,
  email?: string,
  bio?: string,
  image?: string,
  bannerImage?: string,
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;
  console.log(username, email, bio, image, bannerImage);
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        bio,
        image,
        bannerImage,
      },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/profile/${username}`);
  redirect(`/profile/${username}`);
};
