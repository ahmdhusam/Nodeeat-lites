import { Router } from "express";
import { restaurantController } from "../controllers/RestaurantController";
import { DtoMiddleware } from "../../common/middlewares/DtoMiddleware";
import { CreateRestaurantDto } from "../controllers/dtos/CreateRestaurantDto";

export const restaurantRouter: Router = Router();

restaurantRouter
  .route("/")
  .post([
    DtoMiddleware(CreateRestaurantDto),
    restaurantController.createRestaurant,
  ]);
