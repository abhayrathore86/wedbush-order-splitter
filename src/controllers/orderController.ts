import { Request, Response } from "express";
import { createOrder, getAllOrders } from "../services/orderService";

export const createOrderController = (req: Request, res: Response): void => {
  const order = createOrder(req.body);
  res.status(201).json(order);
};

export const getAllOrdersController = (_req: Request, res: Response): void => {
  const orders = getAllOrders();
  res.json(orders);
};
