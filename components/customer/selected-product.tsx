'use client';

import ShoppingCartTable from "../shopping-cart/shopping-cart-table";

const SelectedProducts = () => {
  return (
    <>
      <h3 className={'font-bold text-xl'}>Selected products</h3>
      <hr />
      <ShoppingCartTable />
    </>
  )
}

export default SelectedProducts;