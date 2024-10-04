'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FC, useContext } from "react";
import { Button } from "../ui/button";
import { ShoppingCartContext } from "@/providers/shopping-cart-provider";
import { Badge } from "../ui/badge";
import { TrashIcon } from "lucide-react";

interface ShoppingCartTableProps {}

const ShoppingCartTable: FC<ShoppingCartTableProps> = () => {
  const { carts, removeFromCart, totalItem, totalPrice} = useContext(ShoppingCartContext);

  if (!carts || carts.length === 0) {
    return (
      <div className="text-center w-full">
        <Badge variant={'destructive'} className={'text-sm font-light w-full rounded'}>No found cart item.</Badge>
      </div>
    )
  }

  return (
    <Table className={'bg-white shadow rounded-lg'}>
      <TableCaption>{'Shopping cart items.'}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SKU</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carts && carts.length > 0 && carts.map((cart) => (
          <TableRow key={cart.product.id}>
            <TableCell className="font-medium">{cart.product.sku}</TableCell>
            <TableCell>{cart.product.name}</TableCell>
            <TableCell>{cart.product.price}</TableCell>
            <TableCell>{cart.quantity}</TableCell>
            <TableCell className="text-right">
              <Button type="button" size={'icon'} onClick={() => removeFromCart(cart.product.id)}>
                <TrashIcon className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <span>Total Items: {totalItem}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5}>
            <span>Total Price: {totalPrice}</span>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default ShoppingCartTable;