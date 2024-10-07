"use client";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";

const PAGE_SIZE = 1;

const employees = [
  {
    id: 1,
    name: "Trump",
    bornIn: 1946,
    party: "Republican",
  },
  {
    id: 2,
    name: "Joe Biden",
    bornIn: 1942,
    party: "Democratic",
  },
];

export default function GettingStartedExample() {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(employees.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(employees.slice(from, to));
  }, [page]);

  return (
    <DataTable
      withTableBorder
      borderRadius="sm"
      withColumnBorders
      highlightOnHover
      // provide data
      records={records}
      // define columns
      columns={[
        {
          accessor: "id",
          // this column has a custom title
          title: "#",
          // right-align column
          textAlign: "right",
        },
        { accessor: "name" },
        { accessor: "bornIn" },
      ]}
      totalRecords={employees.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
    />
  );
}
