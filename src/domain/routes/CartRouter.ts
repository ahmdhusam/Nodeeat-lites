import { Router, Request, Response } from "express";
import { ClearCart, getCart } from "../controllers/CartController";

const route = "/api/v1/Carts";
export const router: Router = Router();

router.route("/:customerId/cart/").get(getCart);

router.route("/:customerId/cart/").delete(ClearCart);
