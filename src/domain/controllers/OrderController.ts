import { Request, Response } from "express";
import { Order } from "../models/Order";
import { OrderRepository } from "../repositry/OrderRepositry";
import { orderService } from "../service/OrderService";

export const PlaceOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  } catch (error: any) {}
};

export const CancelOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  } catch (error: any) {}
};
export const UpdateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  } catch (error: any) {}
};
export const OrdersHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const customerId = parseInt(req.params.customerId);
  console.log("customerId: ", customerId);

  try {
    const result = await orderService.historyOfOrders(customerId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(400).json({ message: error.details });
  }
};

export const OrderDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const orderId = parseInt(req.params.orderId);
  console.log(orderId);

  try {
    const result = await orderService.detailsOfOrders(orderId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(400).json({ message: error.details });
  }
};

export const OrderSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({});
  } catch (error: any) {}
};
