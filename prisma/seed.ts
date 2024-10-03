import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Fetch all ExerciseTypes and ExerciseDays initially
  let exerciseTypes = await prisma.exerciseType.findMany();
  let exerciseDays = await prisma.exerciseDay.findMany();

  if (exerciseTypes.length === 0) {
    await prisma.exerciseType.createMany({
      data: [{ type: "Weights" }, { type: "Cardio" }, { type: "Stretching" }],
    });
    console.log("ExerciseTypes populated.");

    exerciseTypes = await prisma.exerciseType.findMany();
  } else {
    console.log("ExerciseTypes already exist.");
  }

  // Add ExerciseDays if they don't exist
  if (exerciseDays.length === 0) {
    await prisma.exerciseDay.createMany({
      data: [
        { day: "Monday" },
        { day: "Tuesday" },
        { day: "Wednesday" },
        { day: "Thursday" },
        { day: "Friday" },
      ],
    });

    // Re-fetch the ExerciseDays after creating
    exerciseDays = await prisma.exerciseDay.findMany();
  } else {
    console.log("ExerciseDays already exist.");
  }

  // Find the specific type and days after refetch
  const weightsType = exerciseTypes.find((type) => type.type === "Weights");
  const CardioType = exerciseTypes.find((type) => type.type === "Cardio");
  const mondayDay = exerciseDays.find((day) => day.day === "Monday");
  const tuesdayDay = exerciseDays.find((day) => day.day === "Tuesday");

  if (!weightsType || !CardioType || !mondayDay || !tuesdayDay) {
    throw new Error("Required ExerciseType or ExerciseDay is missing.");
  }

  const exercisesToCreate = [
    // Monday's exercises
    {
      name: "Running",
      sets: 1,
      repetitions: 1,
      duration: 15,
      exerciseType: { connect: { id: CardioType.id } },
      day: { connect: { id: mondayDay.id } },
    },
    {
      name: "Push ups",
      sets: 3,
      repetitions: 15,
      duration: 5,
      note: "Push ups are good for chest and triceps",
      exerciseType: { connect: { id: weightsType.id } },
      day: { connect: { id: mondayDay.id } },
    },
    {
      name: "Dips",
      sets: 3,
      repetitions: 15,
      duration: 5,
      note: "Dips are one of the best exercises for building human strength, growing the side chest, and developing powerful triceps. Depending on the body position, dips can primarily target either the chest or the triceps.",
      exerciseType: { connect: { id: weightsType.id } },
      day: { connect: { id: mondayDay.id } },
      url: "https://www.youtube.com/watch?v=oA8Sxv2WeOs",
    },
    {
      name: "Flat Bench Press",
      sets: 3,
      repetitions: 10,
      duration: 10,
      note: "The flat bench press is a great full-body workout that strengthens your chest, shoulders, and arms while improving your push strength for everyday tasks and sports.",
      exerciseType: { connect: { id: weightsType.id } },
      day: { connect: { id: mondayDay.id } },
      url: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
    },
    {
      name: "dumbell Bench Press on flat Bench",
      sets: 3,
      repetitions: 10,
      duration: 10,
      note: "dumbell Bench Press",
      exerciseType: { connect: { id: weightsType.id } },
      day: { connect: { id: mondayDay.id } },
      url: "https://www.youtube.com/watch?v=O7ECGhZj_Hc",
    },
    {
      name: "Incline Bench Press",
      sets: 4,
      repetitions: 10,
      duration: 10,
      note: "Incline bench press with barbell",
      exerciseType: { connect: { id: weightsType.id } },
      day: { connect: { id: mondayDay.id } },
      url: "https://www.youtube.com/watch?v=SHsUIZiNdeY",
    },
    {
      name: "Chest Fly Machine",
      sets: 4,
      repetitions: 10,
      duration: 10,
      note: "This exercise is good for middle part of chest",
      exerciseType: { connect: { id: weightsType.id } },
      day: { connect: { id: mondayDay.id } },
      url: "https://www.youtube.com/watch?v=eGjt4lk6g34",
    },
    // Tuesday's exercises
    {
      name: "Deadlift",
      sets: 4,
      repetitions: 10,
      duration: 10,
      note: "Barbell deadlift",
      exerciseType: { connect: { id: weightsType.id } },
      day: { connect: { id: tuesdayDay.id } },
    },
    {
      name: "Pull-ups",
      sets: 3,
      repetitions: 8,
      duration: 40,
      note: "Bodyweight pull-ups",
      exerciseType: { connect: { id: weightsType.id } },
      day: { connect: { id: tuesdayDay.id } },
    },
  ];

  // Create all exercises in a single Promise.all call
  await Promise.all(
    exercisesToCreate.map((exercise) =>
      prisma.exercise.create({
        data: exercise,
      })
    )
  );

  console.log("Exercises for Monday and Tuesday have been seeded.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
