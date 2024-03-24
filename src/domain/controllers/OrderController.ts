import { Request, Response } from "express";
import { Order } from "../models/Order";
import { OrderRepository } from "../repositry/OrderRepositry";

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
  try {
  } catch (error: any) {}
};

export const OrderDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  } catch (error: any) {}
};

export const OrderSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({});
  } catch (error: any) {}
};
