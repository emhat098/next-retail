import formatter from "@/lib/formatter";
import { Order, ShoppingCartItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

const OrderItemsBillColumns: ColumnDef<ShoppingCartItem>[] = [
  {
    header: 'Name',
    accessorKey: 'product.name',
  },
  {
    header: 'Price',
    accessorKey: 'product.price',
    cell: ({row}) => {
      return (
        <span>{formatter(row.original.product.salePrice ?? row.original.product.price, 'vi')}</span>
      )
    }
  },
  {
    header: 'Quantity',
    'accessorKey': 'quantity',
  },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: ({row}) => {
      const { product: {salePrice, price}, quantity } = row.original;
      return (
        <span>{formatter((salePrice ?? price) * quantity, 'vi')}</span>
      )
    }
  },
];

export {
  OrderItemsBillColumns
};
