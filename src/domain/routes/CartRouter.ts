import { Router, Request, Response } from "express";
import * as CartController from "../controllers/CartController";

import { addCartItem, viewCartItems } from "../controllers/CartItemController";

const route = "/api/v1/Carts";
export const router: Router = Router();

router.route("/:customerId/cart/").get(viewCartItems);

router
  .route("/:customerId/cart/cart-items/:cartItemId")
  .delete(CartController.deleteCartItem);

router.route("/:customerId/cart/cart-items/:menuItemId").post(addCartItem);

router.route("/:customerId/cart/").delete(CartController.clearCart);
