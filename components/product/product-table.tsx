'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FC } from "react";
import { Product } from "@/types";
import AddToCart from "../shopping-cart/add-to-cart";

interface ProductTableProps {
  title: string;
  products: Product[];
}

const ProductTable: FC<ProductTableProps> = ({title, products }) => {
  return (
    <Table className={'bg-white shadow rounded-lg'}>
      <TableCaption>{title}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SKU</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(!products || products.length === 0) && (
          <TableRow>
            <TableCell className={"text-center"} colSpan={4}>
              No found product.
            </TableCell>
          </TableRow>
        )}
        {products && products.length > 0 && products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.sku}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">
              <AddToCart product={product} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProductTable;