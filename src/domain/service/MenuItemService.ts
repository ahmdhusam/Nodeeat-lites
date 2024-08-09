import { NotFoundException } from "../../common/exceptions";
import { InvalidOperation as InvalidOperationException } from "../../common/exceptions/InvalidOperation";
import { DeepPartial } from "typeorm";
import { MenuItem } from "../models/MenuItem";
import {
  MenuItemRepository,
  menuItemRepository,
} from "../repositry/MenuItemRepository";

export class MenuItemService {
  constructor(private readonly menuItemRepo: MenuItemRepository) {}

  async checkAvailabilty(id: number, quantity: number): Promise<void> {
    let item = await this.menuItemRepo.findOneById(id);
    if (item!.TotalAvailable < quantity) {
      throw new InvalidOperationException("quantity isn't available");
    }
  }

  async findById(id: number): Promise<MenuItem | null> {
    let item = await this.menuItemRepo.findOneById(id);
    if (!item) {
      throw new NotFoundException("menu Item Doesnt Exist");
    }
    return item;
  }

  async createMany(menuItems: DeepPartial<MenuItem>[]) {
    return this.menuItemRepo.createManyAndSave(menuItems);
  }
}
export const menuItemService = new MenuItemService(menuItemRepository);
