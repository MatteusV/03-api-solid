/*
  Warnings:

  - You are about to drop the column `descripton` on the `gynms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gynms" DROP COLUMN "descripton",
ADD COLUMN     "description" TEXT;
