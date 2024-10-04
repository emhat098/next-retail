import { Product } from "./product";

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

export type ShoppingCartConextType = {
  carts: ShoppingCartItem[];
  removeFromCart: (productId: string) => void;
  findCart: (product: Product) => ShoppingCartItem;
  addToCart: (cart: ShoppingCartItem) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItem: number;
};
