import { ItemCart } from "./item-cart";

export interface Order {
  userId: number;
  orderState?: string; // CONFIRMED por defecto
  items: ItemCart[];
}
