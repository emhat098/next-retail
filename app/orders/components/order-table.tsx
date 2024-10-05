'use server';

import getOrders, { defaultGetOrdersOrderBy, defaultGetOrderWhere } from "@/actions/order/get-orders";
import TablePagination from "@/components/product/table-pagination";
import CommonTable from "@/components/table/common-table";
import { Order } from "@/types";
import { FC } from "react";
import columns from "./columns";

interface OrderTableProps {
  page: number;
  itemPerPage: number;
  q?: string;
}

const OrderTable: FC<OrderTableProps> = async ({page, itemPerPage, q}) => {

  const orders = await getOrders(
    defaultGetOrderWhere(q),
    itemPerPage,
    defaultGetOrdersOrderBy,
    page
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={orders?.data as Order[] ?? []}
        tableCaption={'A list of orders.'}
      />
      {orders?.pagination && (
        <TablePagination
          currentPage={orders.pagination.currentPage}
          itemPerPage={orders.pagination.itemPerPage}
          q={q}
          totalPage={orders.pagination.totalPage}
          url={'/orders'}
        />
      )}
    </>
  )
};

export default OrderTable;