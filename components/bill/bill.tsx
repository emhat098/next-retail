'use client';

import { Order } from "@/types";
import { FC, useEffect, useOptimistic, useState } from "react";
import { appConfig } from '@/next.app.config.mjs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommonTable from "@/components/table/common-table";
import { OrderItemsBillColumns } from "./order-items-bill-columns";
import ObjectToTable from "@/components/table/object-to-table";
import formatter from "@/lib/formatter";
import generateBillPDF from "@/lib/generate-bill-pdf";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
    <Card className="w-full text-xs mx-auto">
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
        <ScrollArea className="h-[40vh]">
          <ScrollBar orientation={'horizontal'} />
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
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-center ">Thank you for shopping with us!</p>
        <p className="">Order created at: {new Date(data.createdAt ?? Date.now()).toLocaleString()}</p>
        <div className="flex justify-end w-full mt-4">
          <PrintButton data={data} />
        </div>
      </CardFooter>
    </Card>
  )
}

interface PrintButtonProps {
  data: Order;
}

const PrintButton: FC<PrintButtonProps> = ({data}) => {
  const [isLoading, setIsLoading] = useState(false);

  const generatePDF = () => {
    setIsLoading(true);
    const doc = generateBillPDF(data as Order);
    doc.output('dataurlnewwindow', {
      filename: data?.id
    });
    setIsLoading(false);
  };

  return (
    <Button disabled={isLoading} onClick={generatePDF}>
      {isLoading ? "Generating PDF..." : "Print"}
    </Button>
  )
}

export default Bill;