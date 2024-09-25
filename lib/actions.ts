"use server";
import prisma from "./db";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { serverSession } from "./session";

export const fetchPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return posts;
};

export const switchLike = async (postId: string) => {
  const { id: userId } = await serverSession();

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
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return;
  }
  redirect("/login");
};

export const findUser = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: { username },
  });

  return user;
};

export const createPost = async (post: {
  postBody?: string;
  imgUrl?: string[];
  vidUrl?: string;
}) => {
  const { id } = await serverSession();
  try {
    await prisma.post.create({
      data: {
        author: { connect: { id } },
        postBody: post.postBody,
        postVideo: post.vidUrl,
        postImage: post.imgUrl,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//Mutation

export const getPost = async (postId: string) => {
  const { id } = await serverSession();

  if (!id) return null;

  let post: any = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return post;
};

export const editPost = async (post: { postId: string; postBody: string }) => {
  const { id } = await serverSession();

  if (!id) return null;

  try {
    await prisma.post.update({
      where: {
        id: post.postId,
      },
      data: {
        postBody: post.postBody,
      },
    });
  } catch (error) {
    throw new Error("An unexpected error occured");
  }
};

export const updateProfile = async (
  username?: string,
  email?: string,
  bio?: string,
  image?: string,
  bannerImage?: string,
) => {
  const { id } = await serverSession();
  try {
    await prisma.user.update({
      where: {
        id,
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

export const sharePosts = async (postId: string, desc: string) => {
  //TODO: create a sharing functionality
};

export const addComment = async (postId: string, desc: string) => {
  const { id } = await serverSession();
  if (!id) throw new Error("User is not authenticated!");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId: id,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};
