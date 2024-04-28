import { Request, Response } from "express";
import { MenuService, menuService } from "../service/MenuService";
import { RestaurantIdParamsDto } from "./dtos/RestaurantIdParamsDto";
import httpStatus from "http-status";
import { CatchErrors } from "../../common/utiles/CatchErrors";
import { MenuParamsDto } from "./dtos/MenuParamsDto";
import { FindOptionsWhere } from "typeorm";
import { Menu } from "../models/Menu";
import { IPaginationOptions } from "../repositry/IPaginationOptions";
import { PaginationOptionsParamsDto } from "./dtos/PaginationOptionsParamsDto";
import {
  PaginationService,
  paginationService,
} from "../service/PaginationService";

@CatchErrors()
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly paginationService: PaginationService
  ) {}

  // TODO: Check if the restaurant belongs to the user
  async create(req: Request, res: Response) {
    const { restaurantId } = req.params as unknown as RestaurantIdParamsDto;
    const menuData = req.body;

    await this.menuService.create(restaurantId, menuData);

    return res.status(httpStatus.NO_CONTENT).json({});
  }

  async update(req: Request, res: Response) {
    const { restaurantId, menuId } = req.params as unknown as MenuParamsDto;
    const menuData = req.body;

    await this.menuService.update(restaurantId, menuId, menuData);

    return res.status(httpStatus.NO_CONTENT).json({});
  }

  async delete(req: Request, res: Response) {
    const { restaurantId, menuId } = req.params as unknown as MenuParamsDto;

    await this.menuService.delete(restaurantId, menuId);

    return res.status(httpStatus.OK).json({});
  }

  async getRestaurantMenus(req: Request, res: Response) {
    const { restaurantId } = req.params as unknown as RestaurantIdParamsDto;

    const menus = await this.menuService.getRestaurantMenus(restaurantId);

    return res.status(httpStatus.OK).json({
      data: menus,
    });
  }

  async getMany(req: Request, res: Response) {
    const { page = 0 } = req.params as unknown as PaginationOptionsParamsDto;

    const paginationOptions =
      this.paginationService.calculatePaginationOptions(page);

    const menus = await this.menuService.getManyAndPaginate(
      {},
      paginationOptions
    );
  }
}

export const menuController = new MenuController(
  menuService,
  paginationService
);
