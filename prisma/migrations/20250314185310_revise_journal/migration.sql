/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Journal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "isPublic",
DROP COLUMN "updatedAt";
