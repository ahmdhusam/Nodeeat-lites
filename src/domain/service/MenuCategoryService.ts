import { FindOptionsWhere } from "typeorm";
import {
  MenuCategoryRepository,
  menuCategoryRepository,
} from "../repositry/MenuCategoryRepository";
import { MenuCategory } from "../models/MenuCategory";

export class MenuCategoryService {
  constructor(
    private readonly menuCategoryRepository: MenuCategoryRepository
  ) {}

  isMenuCategoryExistBy(where: FindOptionsWhere<MenuCategory>) {
    return this.menuCategoryRepository.isExistBy(where);
  }
}

export const menuCategoryService = new MenuCategoryService(
  menuCategoryRepository
);
