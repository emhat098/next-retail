'use client';

import { Order } from "@/types";
import { FC, useEffect, useState } from "react";
import { appConfig } from '@/next.app.config.mjs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommonTable from "@/components/table/common-table";
import { OrderItemsBillColumns } from "./order-items-bill-columns";
import ObjectToTable from "@/components/table/object-to-table";
import formatter from "@/lib/formatter";

interface BillProps {
  orderId?: string;
  order?: Order;
}

const Bill: FC<BillProps> = ({ orderId, order }) => {
  const [data, setData] = useState<Order>();

  useEffect(() => {
    if (orderId) {
      fetch('/api/order/get/' + orderId)
        .then(res => res.json())
        .then(res => {
          setData(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [orderId]);

  useEffect(() => {
    if (order) {
      setData(order);
    }
  }, [order])

  if (!data) {
    return <div>Not found data.</div>;
  }

  return (
    <Card className="w-full text-xs mx-auto print:border-none print:shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">
          {appConfig.name}
        </CardTitle>
        <div className="flex flex-col gap-1">
          <p>{appConfig.address}</p>
          <p>Phone: {appConfig.phoneNumber}</p>
          <div dangerouslySetInnerHTML={{__html: appConfig.description }} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="p-2">
            <h3 className="font-bold">Customer information:</h3>
            < hr />
          </div>
          <ObjectToTable data={data.customer} />
        </div>
        <div className="flex flex-col">
          <div className="p-2">
            <h3 className="font-bold">Ordered items:</h3>
            <hr />
          </div>
          <CommonTable
            columns={OrderItemsBillColumns}
            data={data.orders}
          />

          <div className="p-2">
            <h3 className="font-bold">Grand total:</h3>
            <hr />
          </div>
          <ObjectToTable
            data={{
              totalItems: data.orders.length,
              totalPrice: formatter(data.orders.reduce((total, {product: { salePrice, price }, quantity}) => {
                return (total + ((salePrice ?? price) * quantity));
              }, 0), 'vi')
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-center ">Thank you for shopping with us!</p>
        <p className="">Order created at: {new Date(data.createdAt ?? Date.now()).toLocaleString()}</p>
        <div className="flex justify-end w-full mt-4 print:hidden">
          <Button onClick={() => window.print()}>Print</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Bill;