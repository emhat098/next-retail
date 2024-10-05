import { BaseType } from "./base";
import { Customer } from "./customer";
import { ShoppingCartItem } from "./shopping-cart";

export interface Order extends BaseType {
  customer: Customer;
  orders: ShoppingCartItem[];
  note: string;
}