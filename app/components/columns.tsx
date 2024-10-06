'use client';

import AddToCart from "@/components/shopping-cart/add-to-cart"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import { ShoppingCartContext } from "@/providers/shopping-cart-provider";
import { useContext } from "react";
import formatter from "@/lib/formatter";

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
    cell: ({row}) => {
      return <div className="font-bold">{formatter(row.original.price, 'vi')}</div>
    }
  },
  {
    header: 'Sale Price',
    accessorKey: 'salePrice',
    cell: ({row}) => {
      if (row.original.salePrice <= 0) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={'sm'} variant={'ghost'}>{'No sale'}</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Product does have a sale price.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
      return (
        <span className="font-bold">{formatter(row.original.salePrice, 'vi')}</span>
      )
    }
  },
  {
    header: 'Stock',
    accessorKey: 'stock',
    cell: ({row}) => {
      const { carts } = useContext(ShoppingCartContext);
      let stock = row.original.stock - (carts?.find(c => c.product.id === row.original.id)?.quantity || 0);
      if (stock <= 0) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={'sm'} variant={'destructive'}>{'OOS'}</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Product is out of stock.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
      return (
        <span className="font-bold">{stock}</span>
      )
    }
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