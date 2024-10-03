/*
  Warnings:

  - The `duration` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ExerciseCategory" AS ENUM ('Cardio', 'Weights', 'Stretching');

-- CreateEnum
CREATE TYPE "ExerciseDays" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "dayId" INTEGER,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "repetitions" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "sets" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "typeId" INTEGER,
ADD COLUMN     "url" TEXT,
DROP COLUMN "duration",
ADD COLUMN     "duration" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ExerciseType" (
    "id" SERIAL NOT NULL,
    "type" "ExerciseCategory" NOT NULL,

    CONSTRAINT "ExerciseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseDay" (
    "id" SERIAL NOT NULL,
    "day" "ExerciseDays" NOT NULL,

    CONSTRAINT "ExerciseDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ExerciseType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "ExerciseDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
