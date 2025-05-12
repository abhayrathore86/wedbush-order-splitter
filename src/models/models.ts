export type OrderType = "BUY" | "SELL";

export interface StockAllocation {
  symbol: string;
  allocation: number;
  price?: number;
}

export interface OrderRequest {
  portfolio: StockAllocation[];
  totalAmount: number;
  type: OrderType;
}

export interface OrderResponse {
  id: string;
  type: OrderType;
  totalAmount: number;
  executionDate: string;
  createdAt: string;
  breakdown: {
    symbol: string;
    allocation: number;
    amount: number;
    quantity: number;
    price: number;
  }[];
}
