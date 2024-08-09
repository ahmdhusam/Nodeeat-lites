import { Repository } from "typeorm";
import { MenuCategory } from "../models/MenuCategory";
import { BaseRepository } from "./base.repository";
import { dbContext } from "./database/db-context";

export class MenuCategoryRepository extends BaseRepository<MenuCategory> {
  constructor(
    private readonly menuCategoryRepository: Repository<MenuCategory>
  ) {
    super(menuCategoryRepository);
  }
}

export const menuCategoryRepository = new MenuCategoryRepository(
  dbContext.getRepository(MenuCategory)
);
