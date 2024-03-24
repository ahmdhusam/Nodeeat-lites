import { FindOptionsWhere } from "typeorm";
import { NotFoundException } from "../../common/exceptions";
import { Order } from "../models/Order";
import { OrderRepository } from "../repositry/OrderRepositry";

export class OrderService {
  constructor(private readonly orderRepo: OrderRepository) {}
  async findBy(where: FindOptionsWhere<Order>): Promise<Order[]> {
    return await this.orderRepo.findBy(where);
  }
}
