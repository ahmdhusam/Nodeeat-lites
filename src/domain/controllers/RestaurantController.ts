import {
  RestaurantService,
  restaurantService,
} from "../service/RestaurantService";
import { NextFunction, Request, Response } from "express";
import { CreateRestaurantDto } from "./dtos/CreateRestaurantDto";
import { IClassConstructor } from "../../common/utiles/IClassConstructor";
import { CatchErrors } from "../../common/utiles/CatchErrors";
import httpStatus from "http-status";
import { RestaurantIdParamsDto } from "./dtos/RestaurantIdParamsDto";

@CatchErrors()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // TODO: Who can create restaurant
  async createRestaurant(req: Request, res: Response) {
    const restaurantData = req.body;
    await this.restaurantService.createRestaurant(restaurantData);

    return res.status(httpStatus.CREATED).send({});
  }

  // TODO: Check if the restaurant belongs to the user
  async update(req: Request, res: Response) {
    const restaurantId = (req.params as unknown as RestaurantIdParamsDto)
      .restaurantId;
    const restaurantData = req.body;

    await this.restaurantService.updateRestaurant(restaurantId, restaurantData);

    return res.status(httpStatus.NO_CONTENT).send({});
  }

  async enable(req: Request, res: Response) {
    const restaurantId = (req.params as unknown as RestaurantIdParamsDto)
      .restaurantId;

    await this.restaurantService.enable(restaurantId);

    return res.status(httpStatus.NO_CONTENT).json({});
  }

  async disable(req: Request, res: Response) {
    const restaurantId = (req.params as unknown as RestaurantIdParamsDto)
      .restaurantId;

    await this.restaurantService.disable(restaurantId);

    return res.status(httpStatus.NO_CONTENT).json({});
  }

  // TODO: Is it should be sorted ?!
  async getAllRestaurant(req: Request, res: Response) {
    const allRestaurant = await this.restaurantService.getAllRestaurant();

    return res.status(httpStatus.OK).json({ restaurant: allRestaurant });
  }
}

export const restaurantController = new RestaurantController(restaurantService);
