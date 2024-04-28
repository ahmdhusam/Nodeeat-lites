import { DeepPartial, FindOptionsWhere } from "typeorm";
import { NotFoundException } from "../../common/exceptions";
import { ConflictException } from "../../common/exceptions/ConflictException";
import { CreateMenuDto } from "../controllers/dtos/CreateMenuDto";
import { MenuRepository, menuRepository } from "../repositry/MenuRepository";
import {
  MenuCategoryService,
  menuCategoryService,
} from "./MenuCategoryService";
import { MenuItemService, menuItemService } from "./MenuItemService";
import { RestaurantService, restaurantService } from "./RestaurantService";
import { Menu } from "../models/Menu";
import { IPaginationOptions } from "../repositry/IPaginationOptions";

export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly restaurantService: RestaurantService,
    private readonly menuCategoryService: MenuCategoryService,
    private readonly menuItemService: MenuItemService
  ) {}

  async create(restaurantId: number, menuDto: CreateMenuDto) {
    const isRestaurantExist = await this.restaurantService.isRestaurantExistBy({
      id: restaurantId,
    });
    if (!isRestaurantExist) {
      throw new NotFoundException("Restaurant not found");
    }

    // TODO: We can change this to find by name
    const isMenuCategoryExist =
      await this.menuCategoryService.isMenuCategoryExistBy({
        id: menuDto.menuCategoryId,
      });
    if (!isMenuCategoryExist) {
      throw new NotFoundException("Menu category not found");
    }

    const isMenuExist = await this.menuRepository.isExistBy({
      name: menuDto.name,
    });
    if (isMenuExist) {
      throw new ConflictException("Menu already exist");
    }
    const { name, description, menuCategoryId, menuItems } = menuDto;

    // TODO: Refactor and use Transaction
    {
      const menu = this.menuRepository.create({ ...menuDto, restaurantId });

      await this.menuItemService.createMany(
        menuItems.map((item) => ({
          ...item,
          menuCategoryId: menuCategoryId,
          menuId: menu.id,
        }))
      );
      return this.menuRepository.save(menu);
    }
  }

  async update(restaurantId: number, menuId: number, menuData: CreateMenuDto) {
    const isRestaurantExist = await this.restaurantService.isRestaurantExistBy({
      id: restaurantId,
    });
    if (!isRestaurantExist) {
      throw new NotFoundException("Restaurant not found");
    }

    const isMenuExist = await this.menuRepository.isExistBy({
      id: menuId,
      restaurantId,
    });
    if (!isMenuExist) {
      throw new NotFoundException("Menu Not Found");
    }

    return this.menuRepository.update(menuId, menuData);
  }

  async delete(restaurantId: number, menuId: number) {
    const isRestaurantExist = await this.restaurantService.isRestaurantExistBy({
      id: restaurantId,
    });
    if (!isRestaurantExist) {
      throw new NotFoundException("Restaurant not found");
    }

    const isMenuExist = await this.menuRepository.isExistBy({
      id: menuId,
      restaurantId,
    });
    if (!isMenuExist) {
      throw new NotFoundException("Menu Not Found");
    }

    return this.menuRepository.deleteById(menuId);
  }

  getRestaurantMenus(restaurantId: number) {
    return this.menuRepository.getMany({ restaurantId });
  }

  getManyAndPaginate(
    where: FindOptionsWhere<Menu>,
    paginationOptions: IPaginationOptions<Menu>
  ) {
    return this.menuRepository.getManyAndPaginate(where, paginationOptions);
  }
}

export const menuService = new MenuService(
  menuRepository,
  restaurantService,
  menuCategoryService,
  menuItemService
);
