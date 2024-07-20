import prisma from "@/lib/db";
import CommentList from "./CommentList";
export default async function Comments({ postId }: { postId: string }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });
  return <CommentList comments={comments} postId={postId} />;
}
