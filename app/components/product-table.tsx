'use client';

import { FC } from "react";
import { Product } from "@/types";
import CommonTable from "@/components/table/common-table";
import Columns from "./columns";

interface ProductTableProps {
  products: Product[];
}

const ProductTable: FC<ProductTableProps> = ({  products }) => {
  return (
    <CommonTable columns={Columns} data={products} tableCaption={''} />
  )
}

export default ProductTable;
