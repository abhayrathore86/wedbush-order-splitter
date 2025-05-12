import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { DECIMAL_PRECISION, DEFAULT_PRICE } from "../utils/config";
import { OrderRequest, OrderResponse } from "../models/types";

const orders: OrderResponse[] = [];

export function getNextMarketDate(): string {
  let date = dayjs();
  while (date.day() === 0 || date.day() === 6) {}
  return date.format("YYYY-MM-DD");
}

export function createOrder(data: OrderRequest): OrderResponse {
  const { portfolio, totalAmount, type } = data;
  const executionDate = getNextMarketDate();
  const createdAt = dayjs().toISOString();

  const breakdown = portfolio.map((stock) => {
    const amount = totalAmount * (stock.allocation / 100);
    const price = stock.price ?? DEFAULT_PRICE;
    const quantity = parseFloat((amount / price).toFixed(DECIMAL_PRECISION));

    return {
      symbol: stock.symbol,
      allocation: stock.allocation,
      amount: parseFloat(amount.toFixed(2)),
      quantity,
      price,
    };
  });

  const order: OrderResponse = {
    id: uuidv4(),
    type,
    totalAmount,
    executionDate,
    createdAt,
    breakdown,
  };

  orders.push(order);

  return order;
}

export function getAllOrders(): OrderResponse[] {
  return orders;
}
