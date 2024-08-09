import { Router } from "express";
import { restaurantController } from "../controllers/RestaurantController";
import { DtoMiddleware } from "../../common/middlewares/DtoMiddleware";
import { CreateRestaurantDto } from "../controllers/dtos/CreateRestaurantDto";
import { UpdateRestaurantDto } from "../controllers/dtos/UpdateRestaurantDto";
import { RestaurantIdParamsDto } from "../controllers/dtos/RestaurantIdParamsDto";
import { NameOptionsQueryDto } from "../controllers/dtos/NameOptionsQueryDto";
import { PaginationOptionsQueryDto } from "../controllers/dtos/PaginationOptionsQueryDto";

export const restaurantRouter: Router = Router();

restaurantRouter
  .route("/")
  .post([
    DtoMiddleware("body", CreateRestaurantDto),
    restaurantController.createRestaurant,
  ]);

restaurantRouter
  .route("/:restaurantId")
  .put([
    DtoMiddleware("params", RestaurantIdParamsDto),
    DtoMiddleware("body", UpdateRestaurantDto),
    restaurantController.update,
  ]);

restaurantRouter
  .route("/:restaurantId/enable")
  .post(restaurantController.enable);

restaurantRouter
  .route("/:restaurantId/disable")
  .post(restaurantController.disable);

restaurantRouter
  .route("/")
  .all(DtoMiddleware("query", PaginationOptionsQueryDto, NameOptionsQueryDto))
  .get(restaurantController.getMany);
