import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllExercises() {
  const exercises = await prisma.exercise.findMany({
    include: {
      exerciseType: true,
      day: true,
    },
    orderBy: {
      day: {
        day: "asc",
      },
    },
  });

  return exercises.map((exercise) => ({
    id: exercise.id,
    name: exercise.name,
    note: exercise.note,
    sets: exercise.sets,
    repetitions: exercise.repetitions,
    duration: exercise.duration,
    url: exercise.url,
    exerciseType: exercise.exerciseType?.type || null,
    day: exercise.day?.day || null,
  }));
}
