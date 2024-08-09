import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

import { BaseRepository } from "./BaseRepository";
import { Order } from "../models/Order";
import { dbContext } from "./database/db-context";
import { Customer } from "../models/Customer";
import { OrderStatus } from "../models/OrderStatus";
import { OrderDetails } from "../models/OrderDetails";

export class OrderRepository extends BaseRepository<Order> {
  constructor(private readonly OrderRepo: Repository<Order>) {
    super(OrderRepo);
  }
  findBy(where: FindOptionsWhere<Order>): Promise<Order[]> {
    return this.OrderRepo.findBy(where);
  }
  /**
   * Find a Order by ID.
   *
   * @param {number} id - The ID of the item to find.
   * @return {Promise<Order | null>} The found item or null if not found.
   */
  async findOneById(id: number): Promise<Order | null> {
    return this.findOneBy({ id });
  }
  async historyOfOrders(id: number): Promise<Order | any | null> {
    // const connection = getConnection();
    // const queryBuilder = connection.createQueryBuilder();
    try {
      const result = await dbContext
        .queryBuilder()
        .createQueryBuilder()
        .select()
        .from(Customer, "C")
        .innerJoinAndSelect(Order, "O", "C.customer_id = O.customer")
        .innerJoinAndSelect(
          OrderStatus,
          "OS",
          "OS.order_status_id = O.order_status"
        )
        .getRawMany();

      console.log(result);
      return result;
    } catch (error: any) {
      console.log(error.details);
      return "error";
    }
  }
  async detailsOfOrders(id: number): Promise<Order | any | null> {
    try {
      const result = await dbContext
        .queryBuilder()
        .createQueryBuilder()
        .select()
        .from(Order, "O")
        .where("O.order_id = :id", { id })
        .innerJoinAndSelect(OrderDetails, "OD", "OD.order_id = O.order_id")
        .getRawMany();
      return result;
    } catch (error: any) {
      console.log(error.details);
      return "error";
    }
  }

  async createOrder(order: DeepPartial<Order>) {
    const { order_details, ...orderData } = order;

    return this.OrderRepo.manager.transaction<Order>(async (entityMangaer) => {
      const orderRepository = entityMangaer.getRepository(Order);
      const orderDetailRepository = entityMangaer.getRepository(OrderDetails);

      const newOrder = orderRepository.create(orderData);
      const newOrderDetails = orderDetailRepository.create(
        order_details as DeepPartial<OrderDetails>[]
      );

      await orderRepository.save(newOrder);
      await orderDetailRepository.save(
        newOrderDetails.map((orderItem) => ({ ...orderItem, order: newOrder }))
      );

      return newOrder;
    });
  }
}
export const orderRepository = new OrderRepository(
  dbContext.getRepository(Order)
);
