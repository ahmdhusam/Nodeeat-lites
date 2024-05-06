import { DeepPartial, FindOptionsWhere } from "typeorm";
import { Order } from "../models/Order";
import { orderRepository, OrderRepository } from "../repositry/OrderRepositry";
import {
  InventoryCheckHandler,
  LockCartHandler,
  OrderCreateHandler,
  PaymentHandler,
  ReleaseLockCartHandler,
} from "./OrderHandler/IHandler";
import { CartService, cartService } from "./CartService";
import { OrderProcessor } from "./OrderHandler/OrderProcessor";
import { Cart } from "../models/Cart";
import { menuItemService } from "./MenuItemService";
import { Transactional } from "typeorm-transactional";
import { dbContext } from "../repositry/database/db-context";

export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly cartService: CartService
  ) {}
  @Transactional()
  async PlaceOrder(customerId: number) {
    try {
      //Create transaction
      //await dbContext.queryRunner.startTransaction();
      let orderProcessor: OrderProcessor = new OrderProcessor(customerId, [
        new LockCartHandler(cartService),
        new InventoryCheckHandler(menuItemService, cartService),
        new PaymentHandler(),
        new OrderCreateHandler(orderRepository),
        new ReleaseLockCartHandler(cartService),
      ]);

      let order = orderProcessor.Process();
      // await dbContext.queryRunner.commitTransaction();
      //end transaction
      return order;
    } catch (error) {
      //  await dbContext.queryRunner.rollbackTransaction();
    }
  }

  async findBy(where: FindOptionsWhere<Order>): Promise<Order[]> {
    return await this.orderRepo.findBy(where);
  }
  async historyOfOrders(id: number): Promise<Order | string | null> {
    return this.orderRepo.historyOfOrders(id);
  }
  async detailsOfOrders(id: number): Promise<Order | null> {
    return this.orderRepo.detailsOfOrders(id);
  }
}

export const orderService = new OrderService(orderRepository, cartService);
