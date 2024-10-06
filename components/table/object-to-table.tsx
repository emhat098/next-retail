'use client';

import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table";
import { FC } from "react";

interface ObjectToTableProps<T> {
  data: T;
}

const formatKey = (key: string) => {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert a space between lowercase and uppercase letters
    .replace(/^[a-z]/, (char) => char.toUpperCase()); // Capitalize the first letter of the string
};

const ObjectToTable: FC<ObjectToTableProps<any>> = <T, >({ data }: ObjectToTableProps<T>) => {
  return (
    <Table>
      <TableBody>
        {Object.entries(data as object).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>{formatKey(key)}</TableCell>
            <TableCell>{value as any}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ObjectToTable;