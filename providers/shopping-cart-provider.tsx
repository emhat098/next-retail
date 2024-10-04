'use client';

import useBrowserCache from '@/hooks/use-browser-cache';
import useShopppingCart from '@/hooks/use-shopping-cart';
import { ShoppingCartConextType } from '@/types';
import { FC, PropsWithChildren, createContext, useEffect } from 'react';

/**
 * The key used to store the shopping cart in the browser cache.
 * @type {string}
 */
export const SHOPPING_CART_BROWSER_KEY: string = 'SHOPPING_CART_BROWSER_KEY';

/**
 * Context for the shopping cart.
 */
export const ShoppingCartContext = createContext<ShoppingCartConextType>(
  {} as ShoppingCartConextType
);

/**
 * Provides a shopping cart context for managing shopping cart items.
 */
const ShoppingCartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setCache, getCache, clearCache } = useBrowserCache(
    SHOPPING_CART_BROWSER_KEY
  );

  const {
    addToCart,
    carts,
    clearCart,
    findCart,
    removeFromCart,
    totalItem,
    totalPrice,
  } = useShopppingCart(getCache() || []);

  useEffect(() => {
    setCache(carts);
  }, [carts, setCache]);

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart,
        carts,
        clearCart: () => {
          clearCache();
          clearCart();
        },
        findCart,
        removeFromCart,
        totalItem,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;