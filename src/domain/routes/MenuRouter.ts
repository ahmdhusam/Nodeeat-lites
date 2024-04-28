import { Router } from "express";
import { DtoMiddleware } from "../../common/middlewares/DtoMiddleware";
import { RestaurantIdParamsDto } from "../controllers/dtos/RestaurantIdParamsDto";
import { CreateMenuDto } from "../controllers/dtos/CreateMenuDto";
import { menuController } from "../controllers/MenuController";
import { MenuParamsDto } from "../controllers/dtos/MenuParamsDto";
import { PaginationOptionsParamsDto } from "../controllers/dtos/PaginationOptionsParamsDto";

export const menuRouter: Router = Router();

// TODO: is it correct place to put it?
menuRouter
  .route("/restaurants/:restaurantId/menus")
  .all(DtoMiddleware(RestaurantIdParamsDto, "params"))
  .post([DtoMiddleware(CreateMenuDto), menuController.create])
  .get(menuController.getRestaurantMenus);

menuRouter
  .route("/restaurants/:restaurantId/menus/:menuId")
  .all(DtoMiddleware(MenuParamsDto, "params"))
  .put([DtoMiddleware(CreateMenuDto), menuController.update])
  .delete(menuController.delete);

menuRouter
  .route("/menus")
  .all(DtoMiddleware(PaginationOptionsParamsDto, "params"))
  .get(menuController.getMany);
