/*
  Warnings:

  - You are about to drop the `_BlogToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "blogId" TEXT;

-- DropTable
DROP TABLE "_BlogToTag";

-- CreateIndex
CREATE INDEX "Tag_blogId_idx" ON "Tag"("blogId");
