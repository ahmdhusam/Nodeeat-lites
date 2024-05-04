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
import {
  PaginationService,
  paginationService,
} from "../service/PaginationService";
import { PaginationOptionsQueryDto } from "./dtos/PaginationOptionsQueryDto";
import { NameOptionsQueryDto } from "./dtos/NameOptionsQueryDto";
import { ILike } from "typeorm";

@CatchErrors()
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly paginationService: PaginationService
  ) {}

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

  async getMany(req: Request, res: Response) {
    const { page = 0, name } =
      req.query as unknown as PaginationOptionsQueryDto & NameOptionsQueryDto;

    const paginationOptions =
      this.paginationService.calculatePaginationOptions(page);

    const restaurants = await this.restaurantService.getManyAndPaginate(
      name
        ? {
            name: ILike(`%${name}%`),
          }
        : {},
      paginationOptions
    );

    return res.status(httpStatus.OK).json({ data: restaurants });
  }
}

export const restaurantController = new RestaurantController(
  restaurantService,
  paginationService
);
