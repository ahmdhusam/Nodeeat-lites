import { Router } from "express";

import { OrderSummary } from "../controllers/OrderController";

export const router: Router = Router();

router.route("/:orderId").get(OrderSummary);
