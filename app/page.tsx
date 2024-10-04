
import SearchingBar from "@/components/product/searching-bar";
import OrderProductTable from "./components/order-product-table";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const CustomerOrderForm = dynamic(() => import("@/components/customer/order-form"), {
  ssr: false,
  loading: () => <div className="text-sm">Loading customer information ...</div>
});

export default function Home() {
  return (
    <>
      <h2 className={"text-2xl font-bold"}>Products</h2>
      <hr className="my-2" />
      <div className="flex flex-col gap-4 items-center justify-center">
        <SearchingBar />
        <Suspense fallback={<div>Loading ....</div>}>
          <OrderProductTable />
        </Suspense>
      </div>
      <h2 className={"text-2xl font-bold"}>New Order</h2>
      <hr className="my-2" />
      <div className="flex flex-col gap-4 items-center justify-center">
        <CustomerOrderForm />
      </div>
    </>
  );
}
