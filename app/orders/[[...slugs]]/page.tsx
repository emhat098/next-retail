
import SearchingBar from "@/components/product/searching-bar";
import { Suspense } from "react";
import OrderTable from "../components/order-table";
import { MAX_ITEM_PER_PAGE } from "@/next.constants.mjs";

interface Params {
  params: {
    slugs: any
  };
  searchParams: {
    q: string;
  };
}

export default function ProductPage({params, searchParams}: Params) {
  const { q } = searchParams;
  const {slugs} = params;
  // First params is the current page;
  const page = Number(slugs ? slugs[0] : 1);
  // Second params is make item per page.
  const itemPerPage = Number(slugs ? slugs[1] : MAX_ITEM_PER_PAGE);

  return (
    <>
      <h2 className={"text-2xl font-bold"}>Orders</h2>
      <hr className="my-2" />
      <div className="flex flex-col gap-4 items-center justify-center">
        <SearchingBar placeholder={"Searching by phone number ..."} />
        <Suspense fallback={<div>Loading ....</div>}>
          <OrderTable itemPerPage={itemPerPage} page={page} q={q} />
        </Suspense>
      </div>
    </>
  );
}
