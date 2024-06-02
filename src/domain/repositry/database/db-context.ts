import { DataSource, ObjectLiteral } from "typeorm";
import dotenv from "dotenv";
import { Customer } from "../../models/Customer";
import { MenuItem } from "../../models/MenuItem";
import { Cart } from "../../models/Cart";
import { CartItem } from "../../models/CartItem";
import { Order } from "../../models/Order";
import { OrderDetails } from "../../models/OrderDetails";
import { OrderStatus } from "../../models/OrderStatus";
import { User } from "../../models/user.entity";
import { Role } from "../../models/role.entity";
import { UserType } from "../../models/user-type.entity";
import {
  initializeTransactionalContext,
  addTransactionalDataSource,
  StorageDriver,
} from "typeorm-transactional";

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
      synchronize: true,
      logging: true,
      //dropSchema: true,
    });
    initializeTransactionalContext({
      storageDriver: StorageDriver.CLS_HOOKED,
    });
    addTransactionalDataSource(this.AppDBContext);

    // queryRunner = dbContext.queryBuilder().createQueryRunner();
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
