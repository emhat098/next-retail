import CustomerOrderForm from "@/components/customer/order-form";
import ProductTable from "@/components/product/product-table";
import SearchingBar from "@/components/product/searching-bar";

export default function Home() {
  return (
    <>
      <h2 className={"text-2xl font-bold"}>Products</h2>
      <hr className="my-2" />
      <div className="flex flex-col gap-4 items-center justify-center">
        <SearchingBar />
        <ProductTable />
      </div>
      <h2 className={"text-2xl font-bold"}>New Order</h2>
      <hr className="my-2" />
      <div className="flex flex-col gap-4 items-center justify-center">
        <CustomerOrderForm />
      </div>
    </>
  );
}
