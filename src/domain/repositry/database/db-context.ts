import "reflect-metadata";
import { DataSource, ObjectLiteral } from "typeorm";
import dotenv from "dotenv";
import { Customer } from "../../model/customer.entity";
import { MenuItem } from "../../model/menu-item.entity";
import { Cart } from "../../model/cart.entity";
import { CartItem } from "../../model/cart-item.entity";
dotenv.config();

class DBContext {
  private readonly AppDBContext: DataSource;

  constructor(url: string) {
    this.AppDBContext = new DataSource({
      type: "postgres",
      url: url,
      entities: [Customer, MenuItem, Cart, CartItem],
      synchronize: process.env.NODE_ENV === "development",
      logging: true,
    });
  }

  async connect() {
    await this.AppDBContext.initialize();
  }

  disconnect() {
    return this.AppDBContext.destroy();
  }

  getRepository<T extends ObjectLiteral>(entity: any) {
    return this.AppDBContext.getRepository<T>(entity);
  }
}

export const dbContext = new DBContext(process.env.DATABASE_URL ?? "");
