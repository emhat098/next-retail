'use client';

import { Product } from "@/types";
import EditProductButton from "@/app/products/components/edit-product-button";
import DeleteProductButton from "./delete-product-button";
import HideProductButton from "./hide-product-button";
import { ColumnDef } from '@tanstack/react-table';
import CommonTable from "../table/common-table";
import { FC } from "react";
import { TablePagination } from "./table-pagination";

const columns: ColumnDef<Product>[] = [
  {
    header: 'SKU',
    accessorKey: 'sku',
  },
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({row}) => {
      return <>
        <EditProductButton id={row.original.id} title={row.original.name} />
      </>
    }
  },
  {
    header: 'Price',
    accessorKey: 'price',
  },
  {
    header: 'Actions',
    accessorKey: '',
    cell: ({row}) => {
      return (
        <div className="flex gap-1">
          <HideProductButton id={row.original.id} isDeleted={row.original.isDeleted} />
          <DeleteProductButton id={row.original.id} />
        </div>
      )
    }
  },
];

interface ProductTableProps {
  title: string;
  products: Product[];
}

const ProductTable: FC<ProductTableProps> = ({ title, products }) => {
  return (
    <CommonTable columns={columns} data={products} tableCaption={title} />
  )
}

export default ProductTable;