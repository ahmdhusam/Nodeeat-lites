import { Repository } from "typeorm";
import { Menu } from "../models/Menu";
import { BaseRepository } from "./base.repository";
import { dbContext } from "./database/db-context";

export class MenuRepository extends BaseRepository<Menu> {
  constructor(private readonly menuRepository: Repository<Menu>) {
    super(menuRepository);
  }
}

export const menuRepository = new MenuRepository(dbContext.getRepository(Menu));
