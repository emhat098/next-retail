'use client';

import { FC } from "react";
import { Product } from "@/types";
import Columns from "./columns";
import dynamic from "next/dynamic";

const CommonTable  = dynamic(() => import("@/components/table/common-table"), {
  ssr: false,
});

interface ProductTableProps {
  products: Product[];
}

const ProductTable: FC<ProductTableProps> = ({  products }) => {
  return (
    <CommonTable columns={Columns} data={products} tableCaption={''} />
  )
}

export default ProductTable;
