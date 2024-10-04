'use server';

import getProducts from "@/actions/product/get-product";
import ProductList from "@/components/product/product-table";
import { Product } from "@/types";

const ProductTable = async () => {
  const products = await getProducts();

  if (!products) {
    return <div>No found product</div>
  }

  return (
    <ProductList
      title={'A list of products.'}
      products={products as Product[] ?? []}
    />
  )
};

export default ProductTable;