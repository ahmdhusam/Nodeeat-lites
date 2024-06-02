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
import { NotFoundException } from "../../common/exceptions";
import { BadRequestException } from "../../common/exceptions/BadRequestException";
import { OrderStatus } from "../../common/enums/OrderStatusEnum";

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

  async cancelOrder(customerId: number, orderId: number) {
    const order = await this.getOneOrderBy({
      id: orderId,
      customer: { id: customerId },
    });

    if (order.order_status_id === OrderStatus.CANCELLED)
      throw new BadRequestException("Order already cancelled");

    if (order.order_status_id === OrderStatus.DELIVERED)
      throw new BadRequestException("Order already delivered");

    // TODO: ! Notify Restaurant to cancel this order

    order.order_status_id = OrderStatus.CANCELLED;
    await this.orderRepo.save(order);
  }

  async getOrderStatus(customerId: number, orderId: number): Promise<string> {
    const order = await this.getOneOrderBy({
      id: orderId,
      customer: { id: customerId },
    });

    return order.order_status.status;
  }

  async getOneOrderBy(where: FindOptionsWhere<Order>): Promise<Order> {
    const order = await this.orderRepo.findOneBy(where);

    if (!order) throw new NotFoundException("Order not found");

    return order;
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
