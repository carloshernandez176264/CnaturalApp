export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
   userId: number;
  orderState: string;
  items: OrderItemRequest[];
  buyerData?: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
}
