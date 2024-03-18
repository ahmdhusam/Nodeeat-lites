import { Router, Request, Response } from "express";
import * as CartController from "../controllers/cart.controller";

export const router: Router = Router();

router.route("/:cartId").get(CartController.getCart);

router
  .route("/:cartId/cart-Items/:cartItemId")
  .delete(CartController.deleteCartItem);

router.route("/:cartId").delete(CartController.clearCart);
