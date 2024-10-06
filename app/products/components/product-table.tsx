'use server';

import getProducts, { defaultGetProductOrderBy, defaultGetProductWhere } from "@/actions/product/get-product";
import ProductList from "@/components/product/product-table";
import TablePagination from "@/components/product/table-pagination";
import { Product } from "@/types";
import { FC } from "react";
import { unstable_cache as cache, revalidateTag} from 'next/cache';

interface ProductTableProps {
  page: number;
  itemPerPage: number;
  q?: string;
}

const ProductTable: FC<ProductTableProps> = async ({page, itemPerPage, q}) => {
  const products = await getProducts(
    defaultGetProductWhere(q),
    itemPerPage,
    defaultGetProductOrderBy,
    page
  );

  return (
    <>
      <ProductList
        title={'A list of products.'}
        products={products?.data as Product[] ?? []}
      />
      {products?.pagination && (
        <TablePagination
          currentPage={products.pagination.currentPage}
          itemPerPage={products.pagination.itemPerPage}
          q={q}
          url={'/products'}
          totalPage={products.pagination.totalPage}
        />
      )}
    </>
  )
};

export default ProductTable;