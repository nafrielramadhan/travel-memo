/*
  Warnings:

  - You are about to drop the column `destination` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Journal` table. All the data in the column will be lost.
  - Added the required column `city` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "destination",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "destination",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
