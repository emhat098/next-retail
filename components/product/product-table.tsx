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
import { Button } from "../ui/button";

const products: IProduct[] = [
  {
    id: "1",
    name: "Product 1",
    price: 200000,
    sku: "INV001"
  },
  
]

const ProductTable = () => {
  return (
    <Table className={'bg-white shadow rounded-lg'}>
      <TableCaption>A list of products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SKU</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.sku}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">
              <Button size={'sm'}>Add to cart</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProductTable;