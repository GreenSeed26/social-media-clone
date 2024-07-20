/*
  Warnings:

  - You are about to drop the `SharedPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SharedPost" DROP CONSTRAINT "SharedPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "SharedPost" DROP CONSTRAINT "SharedPost_userId_fkey";

-- DropTable
DROP TABLE "SharedPost";
