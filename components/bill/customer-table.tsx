'use client';

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Customer } from "@/types";
import { FC } from "react";

interface CustomerTableProps {
  customer: Customer;
}

const formatKey = (key: string) => {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert a space between lowercase and uppercase letters
    .replace(/^[a-z]/, (char) => char.toUpperCase()); // Capitalize the first letter of the string
};

const CustomerTable: FC<CustomerTableProps> = ({ customer }) => {
  return (
    <Table>
      <TableBody>
        {Object.entries(customer).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>{formatKey(key)}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CustomerTable;