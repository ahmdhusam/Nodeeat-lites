import { Router, Request, Response } from "express";
import { deleteCartItem } from "../controllers/cart.controller";
import {
  addCartItem,
  viewCartItems,
} from "../controllers/cart-item.controller";

export const router: Router = Router();

router.route("/:cartId").get(viewCartItems);

router
  .route("/:cartId/cart-items/:cartItemId")
  .delete(deleteCartItem)
  .post(addCartItem);
