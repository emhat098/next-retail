'use server';

import getProducts from "@/actions/product/get-product";
import { Product } from "@/types";
import ProductTable from "./product-table";

const OrderProductTable = async () => {
  const products = await getProducts();

  if (!products) {
    return <div>Something went wrong.</div>
  }

  return (
    <ProductTable
      title={'A list of products.'}
      products={products as Product[] ?? []}
    />
  )
};

export default OrderProductTable;