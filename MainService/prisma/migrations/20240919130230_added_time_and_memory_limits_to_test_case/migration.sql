/*
  Warnings:

  - Added the required column `memoryInMB` to the `TestCase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeInMS` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "memoryInMB" INTEGER NOT NULL,
ADD COLUMN     "timeInMS" INTEGER NOT NULL;
