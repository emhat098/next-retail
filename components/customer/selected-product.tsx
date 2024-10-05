'use client';

import ShoppingCartTable from "../shopping-cart/shopping-cart-table";

const SelectedProducts = () => {
  return (
    <>
      <h3 className={'font-bold text-xl print:text-sm'}>Ordered items</h3>
      <ShoppingCartTable />
    </>
  )
}

export default SelectedProducts;