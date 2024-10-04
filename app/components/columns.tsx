'use client';

import AddToCart from "@/components/shopping-cart/add-to-cart"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

const Columns: ColumnDef<Product>[] = [
  {
    header: 'SKU',
    accessorKey: 'sku',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Price',
    accessorKey: 'price',
  },
  {
    header: 'Actions',
    cell: ({row}) => {
      return (
        <div className="flex gap-2">
          <AddToCart product={row.original} />
        </div>
      );
    }
  }
]

export default Columns;