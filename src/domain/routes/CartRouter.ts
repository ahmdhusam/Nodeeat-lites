import { Router, Request, Response } from "express";
import * as CartController from "../controllers/CartController";
import {
  addCartItem,
  viewCartItems,
} from "../controllers/cart-item.controller";
const route = "/api/v1/Carts";
export const router: Router = Router();

router.route(`/:cartId`).get(viewCartItems);

router
  .route("/:cartId/cart-items/:cartItemId")
  .delete(CartController.deleteCartItem)
  .post(addCartItem);

router.route("/:cartId").delete(CartController.clearCart);
