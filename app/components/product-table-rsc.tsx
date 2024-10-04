'use server';

import getProducts from "@/actions/product/get-product";
import ProductTable from "@/components/product/product-table";
import { Product } from "@/types";

const ProductTableRSC = async () => {
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

export default ProductTableRSC;