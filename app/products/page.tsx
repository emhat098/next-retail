
import SearchingBar from "@/components/product/searching-bar";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import ProductTable from "./components/product-table";

const EditProductButton = dynamic(() => import("./components/edit-product-button"), {
  ssr: false,
  loading: () => <Skeleton className="w-40 h-10 rounded"></Skeleton>
});

export default function ProductPage() {
  return (
    <>
      <h2 className={"text-2xl font-bold"}>Products</h2>
      <hr className="my-2" />
      <div className="flex flex-col gap-4 items-center justify-center">
        <SearchingBar>
          <EditProductButton />
        </SearchingBar>
        <Suspense fallback={<div>Loading ....</div>}>
          <ProductTable />
        </Suspense>
      </div>
    </>
  );
}
