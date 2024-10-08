"use client";
import { ExerciseCategory, ExerciseDays } from "@prisma/client";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";

const PAGE_SIZE = 7;

type TableProps = {
  tableData: {
    id: number;
    name: string;
    note: string | null;
    sets: number;
    repetitions: number;
    duration: number | null;
    url: string | null;
    exerciseType: ExerciseCategory | string;
    day: ExerciseDays | string;
  }[];
};

export default function Table({ tableData }: TableProps) {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(tableData.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(tableData.slice(from, to));
  }, [page, tableData]);

  return (
    <DataTable
      withTableBorder
      borderRadius="sm"
      withColumnBorders
      highlightOnHover
      records={records}
      columns={[
        { accessor: "name", width: 150 },
        { accessor: "note", width: 350 },
        { accessor: "sets", width: 70 },
        { accessor: "repetitions", width: 100 },
        { accessor: "duration", width: 100 },
        { accessor: "url", width: 220 },
        { accessor: "exerciseType", width: 120 },
        { accessor: "day", width: 100 },
      ]}
      totalRecords={tableData.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
    />
  );
}
