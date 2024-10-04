'use server';

import getProducts from "@/actions/product/get-product";
import { Product } from "@/types";
import ProductTable from "./product-table";
import { FC } from "react";

interface OrderProductTableProps {
  q: string;
}

const OrderProductTable: FC<OrderProductTableProps> = async ({ q }) => {
  const where = q ? {
    OR: [
      {
        sku: {
          contains: q,
          mode: 'insensitive'
        },
      },
      {
        name: {
          contains: q,
          mode: 'insensitive'
        },
      }
    ]
  } : {};

  const products = q ? await getProducts(where) : []; 
  return (
    <ProductTable
      products={products as Product[] ?? []}
    />
  )
};

export default OrderProductTable;