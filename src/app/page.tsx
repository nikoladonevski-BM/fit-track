import { Button, Paper } from "@mantine/core";
import Table from "./components/data-table";

export default function Home() {
  return (
    <Paper p={50}>
      <p>FitTrack</p>
      <Table />
      <Button color="#C3FF36" c="black">
        alo
      </Button>
    </Paper>
  );
}
