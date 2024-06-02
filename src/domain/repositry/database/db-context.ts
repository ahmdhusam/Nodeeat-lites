import "reflect-metadata";
import { DataSource, ObjectLiteral } from "typeorm";
import dotenv from "dotenv";
import { Customer } from "../../models/customer.entity";
import { MenuItem } from "../../models/menu-item.entity";
import { Cart } from "../../models/cart.entity";
import { CartItem } from "../../models/cart-item.entity";
import { Order } from "../../models/Order";
import { OrderDetails } from "../../models/OrderDetails";
import { OrderStatus } from "../../models/OrderStatus";
import { User } from "../../models/user.entity";
import { Role } from "../../models/role.entity";
import { UserType } from "../../models/user-type.entity";

dotenv.config();

class DBContext {
  private readonly AppDBContext: DataSource;

  constructor(url: string) {
    this.AppDBContext = new DataSource({
      type: "postgres",
      url: url,
      entities: [
        Customer,
        MenuItem,
        Cart,
        CartItem,
        Order,
        OrderDetails,
        OrderStatus,
        User,
        Role,
        UserType,
      ],
      synchronize: process.env.NODE_ENV === "development",
      logging: true,
    });
  }
  queryBuilder() {
    return this.AppDBContext;
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
