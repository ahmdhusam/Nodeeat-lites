import { Router, Request, Response } from "express";

import { cartItemController } from "../controllers/CartItemController";
import { cartController } from "../controllers/CartController";

const route = "/api/v1/Carts";
export const router: Router = Router();

router.route("/:customerId/cart/").get(cartController.GetCart);

router
  .route("/:customerId/cart/cart-items/:cartItemId")
  .delete(cartItemController.DeleteCartItem);

router
  .route("/:customerId/cart/cart-items/:menuItemId")
  .post(cartItemController.AddCartItem);

router.route("/:customerId/cart/").delete(cartController.ClearCart);
