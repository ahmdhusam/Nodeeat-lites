import {
  RestaurantService,
  restaurantService,
} from "../service/RestaurantService";
import { NextFunction, Request, Response } from "express";
import { CreateRestaurantDto } from "./dtos/CreateRestaurantDto";
import { IClassConstructor } from "../../common/utiles/IClassConstructor";
import { CatchErrors } from "../../common/utiles/CatchErrors";

@CatchErrors()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  async createRestaurant(req: Request, res: Response) {
    const restaurantData = req.body;
    await this.restaurantService.createRestaurant(restaurantData);

    return res.status(201).send({});
  }
}

export const restaurantController = new RestaurantController(restaurantService);
