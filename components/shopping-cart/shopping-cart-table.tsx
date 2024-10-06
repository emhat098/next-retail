'use client';

import { FC, useContext } from "react";
import { Button } from "../ui/button";
import { ShoppingCartContext } from "@/providers/shopping-cart-provider";
import { TrashIcon } from "lucide-react";
import CommonTable from "../table/common-table";
import { ColumnDef } from "@tanstack/react-table";
import { ShoppingCartItem } from "@/types";
import formatter from "@/lib/formatter";

interface RemoveCartButtonProps {
  removeFromCart: any;
}

const RemoveCartButton: FC<RemoveCartButtonProps> = ({removeFromCart}) => {
  return (
    <Button type="button" size={'icon'} onClick={removeFromCart}>
      <TrashIcon className="w-4 h-4" />
    </Button>
  )
}

const columns: ColumnDef<ShoppingCartItem>[] = [
  {
    header: 'Name',
    cell: ({row}) => {
      return (
        <div>{row.original.product.name}</div>
      )
    },
    footer: () => {
      const { totalItem, totalPrice } = useContext(ShoppingCartContext);
      return (
        <div className="flex flex-col gap-2">
          <p>Total items: {totalItem}</p>
          <p>Total price: {formatter(totalPrice, 'vi')}</p>
        </div>
      )
    },
  },
  {
    header: 'Price',
    cell: ({row}) => {
      return (
        <div>{formatter(row.original.product.salePrice ?? row.original.product.price, 'vi')}</div>
      )
    }
  },
  {
    header: 'Quantity',
    cell: ({row}) => {
      return (
        <div>{row.original.quantity}</div>
      )
    }
  },
  {
    header: 'Total',
    cell: ({row}) => {
      return (
        <div>
          {formatter((row.original.product.salePrice ?? row.original.product.price) * row.original.quantity, 'vi')}
        </div>
      )
    }
  },
  {
    accessorKey: 'actions',
    header: () => {
      return (
        <div className="no-print">
          Actions
        </div>
      )
    },
    cell: ({row}) => {
      const { removeFromCart } = useContext(ShoppingCartContext);
      return (
        <div className="no-print">
          <RemoveCartButton removeFromCart={() => removeFromCart(row.original.product.id)} />
        </div>
      )
    }
  }
]

interface ShoppingCartTableProps {}

const ShoppingCartTable: FC<ShoppingCartTableProps> = () => {
  const { carts } = useContext(ShoppingCartContext);

  return (
    <CommonTable
      data={carts}
      columns={columns}
    />
  )
}

export default ShoppingCartTable;