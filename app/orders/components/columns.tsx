'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Bill from "@/components/bill/bill";
import BillDialog from "@/components/bill/dialog-bill";

const columns: ColumnDef<Order>[] = [
  {
    header: 'Full Name',
    accessorKey: 'customer.fullName',
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
          {new Date(row.original.createdAt ?? Date.now()).toLocaleString()}
        </div>
      )
    }
  },
  {
    header: 'Actions',
    cell: ({row}) => {
      return (
        <BillDialog disabled={false} orderId={row.original.id} title={'View'} />
      )
    }
  }
];

export default columns;