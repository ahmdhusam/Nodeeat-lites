import { NotFoundException } from "../../common/exceptions";
import { ConflictException } from "../../common/exceptions/ConflictException";
import { CreateMenuDto } from "../controllers/dtos/CreateMenuDto";
import { MenuRepository, menuRepository } from "../repositry/MenuRepository";
import {
  MenuCategoryService,
  menuCategoryService,
} from "./MenuCategoryService";
import { RestaurantService, restaurantService } from "./RestaurantService";

export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly restaurantService: RestaurantService,
    private readonly menuCategoryService: MenuCategoryService
  ) {}

  async create(restaurantId: number, menuData: CreateMenuDto) {
    const isRestaurantExist = await this.restaurantService.isRestaurantExistBy({
      id: restaurantId,
    });
    if (!isRestaurantExist) {
      throw new NotFoundException("Restaurant not found");
    }

    // TODO: We can change this to find by name
    const isMenuCategoryExist =
      await this.menuCategoryService.isMenuCategoryExistBy({
        id: menuData.menuCategoryId,
      });
    if (!isMenuCategoryExist) {
      throw new NotFoundException("Menu category not found");
    }

    const isMenuExist = await this.menuRepository.isExistBy({
      name: menuData.name,
    });
    if (isMenuExist) {
      throw new ConflictException("Menu already exist");
    }

    const menu = this.menuRepository.create({ ...menuData, restaurantId });

    return this.menuRepository.save(menu);
  }
}

export const menuService = new MenuService(
  menuRepository,
  restaurantService,
  menuCategoryService
);
