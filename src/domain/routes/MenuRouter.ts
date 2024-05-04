import { Router } from "express";
import { DtoMiddleware } from "../../common/middlewares/DtoMiddleware";
import { RestaurantIdParamsDto } from "../controllers/dtos/RestaurantIdParamsDto";
import { CreateMenuDto } from "../controllers/dtos/CreateMenuDto";
import { menuController } from "../controllers/MenuController";
import { MenuParamsDto } from "../controllers/dtos/MenuParamsDto";
import { PaginationOptionsQueryDto } from "../controllers/dtos/PaginationOptionsQueryDto";
import { NameOptionsQueryDto } from "../controllers/dtos/NameOptionsQueryDto";

export const menuRouter: Router = Router();

// TODO: is it correct place to put it?
menuRouter
  .route("/restaurants/:restaurantId/menus")
  .all(DtoMiddleware("params", RestaurantIdParamsDto))
  .post([DtoMiddleware("body", CreateMenuDto), menuController.create])
  .get(menuController.getRestaurantMenus);

menuRouter
  .route("/restaurants/:restaurantId/menus/:menuId")
  .all(DtoMiddleware("params", MenuParamsDto))
  .put([DtoMiddleware("body", CreateMenuDto), menuController.update])
  .delete(menuController.delete);

menuRouter
  .route("/menus")
  .all(DtoMiddleware("query", PaginationOptionsQueryDto, NameOptionsQueryDto))
  .get(menuController.getMany);
