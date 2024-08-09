import { Router } from "express";

import {
  CancelOrder,
  Order_Details,
  OrderSummary,
  OrdersHistory,
  PlaceOrder,
  GetOrderStatus,
} from "../controllers/OrderController";

export const router: Router = Router();

router.route("/placeOrder/:customerId").post(PlaceOrder);
router.route("/:orderId/cancel").post(CancelOrder);
router.route("/:orderId/status").get(GetOrderStatus);
router.route("/:customerId/history").get(OrdersHistory);
router.route("/:orderId/summary").get(OrderSummary);
router.route("/:orderId/details").get(Order_Details);
