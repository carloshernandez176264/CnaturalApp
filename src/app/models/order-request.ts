export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  userId: number;
  orderState: string;
  items: OrderItemRequest[];
}
