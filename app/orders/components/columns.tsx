'use client';

import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Order>[] = [
  {
    header: 'Full Name',
    accessorKey: 'customer.fullname',
  },
  {
    header: 'Phone address',
    accessorKey: 'customer.phoneNumber',
  },
  {
    header: 'Date created',
    accessorKey: 'createdAt',
    cell: ({row}) => {
      return (
        <div>
          {new Date(row.original.createdAt).toLocaleString()}
        </div>
      )
    }
  },
];