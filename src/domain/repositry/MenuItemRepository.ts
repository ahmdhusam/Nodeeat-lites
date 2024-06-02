import { DeepPartial, Repository } from "typeorm";

import { MenuItem } from "../models/MenuItem";
import { BaseRepository } from "./BaseRepository";
import { dbContext } from "./database/db-context";

export class MenuItemRepository extends BaseRepository<MenuItem> {
  constructor(private readonly menuItemRepo: Repository<MenuItem>) {
    super(menuItemRepo);
  }

  createManyAndSave(menuItems: DeepPartial<MenuItem>[]) {
    const menuItemsInstance = this.menuItemRepo.create(menuItems);

    return this.menuItemRepo.save(menuItemsInstance);
  }

  async findOneById(id: number): Promise<MenuItem | null> {
    return this.findOneBy({ id });
  }
}

export const menuItemRepository = new MenuItemRepository(
  dbContext.getRepository(MenuItem)
);
