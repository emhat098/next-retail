'use server';

import getProducts, { defaultGetProductOrderBy, defaultGetProductWhere } from "@/actions/product/get-product";
import ProductTable from "./product-table";
import { FC } from "react";
import { MAX_ITEM_PER_PAGE_ORDER } from "@/next.constants.mjs";

interface OrderProductTableProps {
  q: string;
}

const OrderProductTable: FC<OrderProductTableProps> = async ({ q }) => {
  const products = q ? await getProducts(
    {
      ...defaultGetProductWhere(q),
      isDeleted: false,
    },
    MAX_ITEM_PER_PAGE_ORDER,
    defaultGetProductOrderBy
  ): {
    data: []
  };

  return (
    <ProductTable products={products?.data ?? []} />
  )
};

export default OrderProductTable;