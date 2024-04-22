import { Request, Response } from "express";
import { MenuService, menuService } from "../service/MenuService";
import { RestaurantIdParamsDto } from "./dtos/RestaurantIdParamsDto";
import httpStatus from "http-status";
import { CatchErrors } from "../../common/utiles/CatchErrors";
import { MenuParamsDto } from "./dtos/MenuParamsDto";

@CatchErrors()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

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
}

export const menuController = new MenuController(menuService);
