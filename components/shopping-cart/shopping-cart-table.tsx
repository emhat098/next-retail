'use client';

import { FC, useContext } from "react";
import { Button } from "../ui/button";
import { ShoppingCartContext } from "@/providers/shopping-cart-provider";
import { TrashIcon } from "lucide-react";
import CommonTable from "../table/common-table";
import { ColumnDef } from "@tanstack/react-table";
import { ShoppingCartItem } from "@/types";

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
          <p>Total item: {totalItem}</p>
          <p>Total price: {totalPrice}</p>
        </div>
      )
    },
  },
  {
    header: 'Price',
    cell: ({row}) => {
      return (
        <div>{row.original.product.price}</div>
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
    header: 'Actions',
    cell: ({row}) => {
      const { removeFromCart } = useContext(ShoppingCartContext);
      return (
        <div>
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
      tableCaption={'Shopping cart items.'}
      data={carts}
      columns={columns}
    />
  )
}

export default ShoppingCartTable;