'use client';

import { Product, ShoppingCartItem } from '@/types';
import { useMemo, useState } from 'react';

const useShopppingCart = (cartItems: ShoppingCartItem[]) => {
  const [carts, setCarts] = useState<ShoppingCartItem[]>(cartItems || []);

  /**
   * Finds an existing cart item in the shopping cart array based on the product ID.
   *
   * @param {Product} product - The cart item to search for.
   * @returns {ShoppingCartItem} The existing cart item if found, otherwise undefined.
   */
  const findCart = (product: Product): ShoppingCartItem =>
    carts.find(c => c.product.id === product.id) as ShoppingCartItem;

  /**
   * Adds a cart item to the shopping cart.
   * If the item already exists in the cart, it increases the quantity by 1.
   *
   * @param {ShoppingCartItem} cart The cart item to add.
   */
  const addToCart = (cart: ShoppingCartItem) => {
    if (!findCart(cart.product)) {
      setCarts([...carts, cart]);
    } else {
      setCarts(
        carts.map(c => {
          if (c.product.id === cart.product.id) {
            return {
              product: c.product,
              quantity: c.quantity + 1,
            };
          }
          return c;
        })
      );
    }
  };

  /**
   * Removes a cart item from the shopping cart.
   * @param {string} productId The ID of the product to remove.
   */
  const removeFromCart = (productId: string) => {
    setCarts(carts.filter(cart => cart.product.id !== productId));
  };

  /**
   * Clears all items from the shopping cart.
   */
  const clearCart = () => {
    setCarts([]);
  };

  /**
   * Calculates the total price of the items in the shopping cart.
   * The total price is calculated by multiplying the quantity of each item by its sale price or regular price,
   * and summing up the results.
   *
   * @param {ShoppingCartItem[]} carts - An array of cart items.
   * @returns {number} The total price of the items in the shopping cart.
   */
  const totalPrice = useMemo(() => {
    return carts.reduce((total, cart) => {
      return total + cart.quantity * (cart.product.salePrice ?? cart.product.price);
    }, 0);
  }, [carts]);

  /**
   * Calculates the total number of items in the shopping cart.
   *
   * @returns {number}
   */
  const totalItem = useMemo(() => {
    return carts.length;
  }, [carts]);

  return {
    addToCart,
    carts,
    clearCart,
    findCart,
    removeFromCart,
    totalItem,
    totalPrice,
  };
};

export default useShopppingCart;