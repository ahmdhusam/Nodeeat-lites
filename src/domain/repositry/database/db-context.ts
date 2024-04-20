import { DataSource, ObjectLiteral } from "typeorm";
import dotenv from "dotenv";
import { Customer } from "../../models/Customer";
import { Cart } from "../../models/cart.entity";
import { CartItem } from "../../models/cart-item.entity";
import { Order } from "../../models/Order";
import { OrderDetails } from "../../models/OrderDetails";
import { OrderStatus } from "../../models/OrderStatus";
import { MenuItem } from "../../models/MenuItem";
import { Restaurant } from "../../models/Restaurant";
import { RestaurantBranch } from "../../models/RestaurantBranch";
import { RestaurantCategory } from "../../models/RestaurantCategory";
import { Menu } from "../../models/Menu";
import { MenuCategory } from "../../models/MenuCategory";
import { Ingredient } from "../../models/Ingredient";
import { Review } from "../../models/Review";
import { Address } from "../../models/Address";

dotenv.config();

class DBContext {
  private readonly AppDBContext: DataSource;

  constructor(url: string) {
    this.AppDBContext = new DataSource({
      type: "postgres",
      url: url,
      entities: [
        Customer,
        Cart,
        CartItem,
        Order,
        OrderDetails,
        OrderStatus,
        Address,
        RestaurantCategory,
        Restaurant,
        RestaurantBranch,
        MenuCategory,
        Menu,
        MenuItem,
        Ingredient,
        Review,
      ],
      // synchronize: true,
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
