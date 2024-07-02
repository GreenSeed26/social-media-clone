"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./db";

export const switchLike = async (postId: string) => {
 const session = await getServerSession(authOptions);
 const userId = session?.user.id as string;

 if(!userId) throw new Error("User not found");

 try {
  const existingLike = await prisma.likes.findFirst({
    where: {
      postId,
      userId
    }
  })

  if(existingLike){
    await prisma.likes.delete({
      where: {
        id: existingLike.id
      }
    })
  } else {
    await prisma.likes.create({
      data: {
        postId,
        userId
      }
    })
  }
 } catch (error) {
  console.log(error)
 }
};
