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
}
export const menuItemService = new MenuItemService(menuItemRepository);
