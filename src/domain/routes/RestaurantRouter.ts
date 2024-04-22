import { Router } from "express";
import { restaurantController } from "../controllers/RestaurantController";
import { DtoMiddleware } from "../../common/middlewares/DtoMiddleware";
import { CreateRestaurantDto } from "../controllers/dtos/CreateRestaurantDto";
import { UpdateRestaurantDto } from "../controllers/dtos/UpdateRestaurantDto";
import { RestaurantIdParamsDto } from "../controllers/dtos/RestaurantIdParamsDto";

export const restaurantRouter: Router = Router();

restaurantRouter
  .route("/")
  .post([
    DtoMiddleware(CreateRestaurantDto),
    restaurantController.createRestaurant,
  ]);

restaurantRouter
  .route("/:restaurantId")
  .put([
    DtoMiddleware(RestaurantIdParamsDto, "params"),
    DtoMiddleware(UpdateRestaurantDto),
    restaurantController.update,
  ]);

restaurantRouter
  .route("/:restaurantId/enable")
  .post(restaurantController.enable);

restaurantRouter
  .route("/:restaurantId/disable")
  .post(restaurantController.disable);

restaurantRouter.route("/").get(restaurantController.getAllRestaurant);
