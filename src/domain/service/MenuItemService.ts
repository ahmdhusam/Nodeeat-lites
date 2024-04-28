import { DeepPartial } from "typeorm";
import { CreateMenuItemDto } from "../controllers/dtos/CreateMenuItemDto";
import { MenuItem } from "../models/MenuItem";
import {
  MenuItemRepository,
  menuItemRepository,
} from "../repositry/MenuItemRepository";

export class MenuItemService {
  constructor(private readonly menuItemRepo: MenuItemRepository) {}

  async findById(id: number): Promise<MenuItem | null> {
    return await this.menuItemRepo.findOneById(id);
  }

  async createMany(menuItems: DeepPartial<MenuItem>[]) {
    return this.menuItemRepo.createManyAndSave(menuItems);
  }
}
export const menuItemService = new MenuItemService(menuItemRepository);
