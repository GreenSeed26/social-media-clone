/*
  Warnings:

  - You are about to drop the column `authorImage` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorImage",
ALTER COLUMN "postBody" DROP NOT NULL,
ALTER COLUMN "postBody" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bannerImage" DROP NOT NULL,
ALTER COLUMN "bannerImage" DROP DEFAULT,
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "bio" DROP DEFAULT;

-- CreateTable
CREATE TABLE "SharedPost" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SharedPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedPost_postId_key" ON "SharedPost"("postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedPost" ADD CONSTRAINT "SharedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedPost" ADD CONSTRAINT "SharedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
