/*
  Warnings:

  - Made the column `totalBudget` on table `Itinerary` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Itinerary` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalExpense` on table `Journal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Journal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Itinerary" ALTER COLUMN "totalBudget" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "Journal" ALTER COLUMN "totalExpense" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL;
