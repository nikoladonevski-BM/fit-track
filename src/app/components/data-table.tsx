"use client";
import { DataTable } from "mantine-datatable";

export default function GettingStartedExample() {
  return (
    <DataTable
      withTableBorder
      borderRadius="sm"
      withColumnBorders
      highlightOnHover
      // provide data
      records={[
        { id: 1, name: "Joe Biden", bornIn: 1942, party: "Democratic" },
        // more records...
      ]}
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
      totalRecords={1}
      recordsPerPage={1}
      page={1}
      onPageChange={(p) => console.log(p)}
    />
  );
}
