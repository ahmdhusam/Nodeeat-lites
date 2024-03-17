import { Router, Request, Response } from "express";
import { deleteCartItem, getCart } from "../controllers/cart.controller";

export const router: Router = Router();

router.route("/:cartId").get(getCart);

router.route("/:cartId/cart-Items/:cartItemId").delete(deleteCartItem);
