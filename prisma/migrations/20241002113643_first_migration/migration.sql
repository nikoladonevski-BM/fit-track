-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
