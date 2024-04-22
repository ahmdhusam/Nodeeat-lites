import { Request, Response } from "express";
import { MenuService, menuService } from "../service/MenuService";
import { RestaurantIdParamsDto } from "./dtos/RestaurantIdParamsDto";
import httpStatus from "http-status";
import { CatchErrors } from "../../common/utiles/CatchErrors";

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
}

export const menuController = new MenuController(menuService);
