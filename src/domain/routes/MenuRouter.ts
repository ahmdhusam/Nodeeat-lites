import { Router } from "express";
import { DtoMiddleware } from "../../common/middlewares/DtoMiddleware";
import { RestaurantIdParamsDto } from "../controllers/dtos/RestaurantIdParamsDto";
import { CreateMenuDto } from "../controllers/dtos/CreateMenuDto";
import { menuController } from "../controllers/MenuController";

export const menuRouter: Router = Router();

// TODO: is it correct place to put it?
menuRouter
  .route("/restaurants/:restaurantId/menus")
  .post([
    DtoMiddleware(RestaurantIdParamsDto, "params"),
    DtoMiddleware(CreateMenuDto),
    menuController.create,
  ]);
