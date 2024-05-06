import { Router, Request, Response } from "express";

import { cartController } from "../controllers/CartController";

const route = "/api/v1/Carts";
export const router: Router = Router();

router.route("/:customerId/cart/").get(cartController.getCart);

router.route("/:customerId/cart/").delete(cartController.ClearCart);
