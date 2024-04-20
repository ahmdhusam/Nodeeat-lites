import { FindOptionsWhere } from "typeorm";
import { NotFoundException } from "../../common/exceptions";
import { Order } from "../models/Order";
import { orderRepository, OrderRepository } from "../repositry/OrderRepositry";

export class OrderService {
  constructor(private readonly orderRepo: OrderRepository) {}
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

export const orderService = new OrderService(orderRepository);
