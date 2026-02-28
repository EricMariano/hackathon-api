/*
  Warnings:

  - Added the required column `description` to the `Squad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membersQuantity` to the `Squad` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_squadId_key";

-- AlterTable
ALTER TABLE "Squad" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "membersQuantity" INTEGER NOT NULL;
