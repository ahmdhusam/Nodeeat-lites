import { Request, Response } from "express";
import { Order } from "../models/Order";
import { OrderDetails } from "../models/OrderDetails";
import { OrderRepository } from "../repositry/OrderRepositry";
import { orderService } from "../service/OrderService";
import { MenuItem } from "../models/menu-item.entity";
import { customerService } from "../service/CustomerService";
import { HttpException } from "../../common/exceptions";
import { menuItemService } from "../service/MenuItemService";

export const PlaceOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract data from the request body
  const cartId = parseInt(req.params.cartId);

  try {
    console.log(req.body);

    let oreder = await orderService.PlaceOrder(cartId);

    res.status(201).json({ message: "Order created successfully", oreder });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error, debug: "error in catch" });
  }
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

export const Order_Details = async (
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
