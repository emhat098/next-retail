import { Customer } from "./customer";
import { ShoppingCartItem } from "./shopping-cart";

export interface Order {
  customer: Customer;
  orders: ShoppingCartItem[];
  note: string;
}