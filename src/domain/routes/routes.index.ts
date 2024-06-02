import express from "express";
import { router as cartRouter } from "./CartRouter";
import { router as orderRouter } from "./OrderRouter";

export const routes = express.Router();
routes.use("/api/v1/Carts", cartRouter);
routes.use("/api/v1/Orders", orderRouter);
