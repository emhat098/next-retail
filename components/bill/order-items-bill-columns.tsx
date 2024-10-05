import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

const OrderItemsBillColumns: ColumnDef<Order>[] = [
  {
    header: 'Name',
    'accessorKey': 'product.name',
  },
  {
    header: 'Price',
    'accessorKey': 'product.price',
  },
  {
    header: 'Quantity',
    'accessorKey': 'quantity',
  },
];

export {
  OrderItemsBillColumns
};
