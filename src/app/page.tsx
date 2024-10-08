import { Paper } from "@mantine/core";
import Table from "./components/data-table";
import { getAllExercises } from "../../prisma/db";

export default async function Home() {
  const exercises = await getAllExercises();

  return (
    <Paper p={50}>
      <Table tableData={exercises} />
    </Paper>
  );
}
