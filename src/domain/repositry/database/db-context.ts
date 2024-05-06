import { DataSource, ObjectLiteral } from "typeorm";
import dotenv from "dotenv";
import { Customer } from "../../models/Customer";
import { MenuItem } from "../../models/MenuItem";
import { Cart } from "../../models/Cart";
import { CartItem } from "../../models/CartItem";
import { Order } from "../../models/Order";
import { OrderDetails } from "../../models/OrderDetails";
import { OrderStatus } from "../../models/OrderStatus";
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
      ],
      synchronize: true,
      logging: true,
      //dropSchema: true,
    });
    initializeTransactionalContext({
      storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE,
    });
    addTransactionalDataSource(this.AppDBContext);
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
