import { Repository } from "typeorm";

import { BaseRepository } from "./base.repository";
import { Order } from "../models/Order";

export class OrderRepository extends BaseRepository<Order> {
  constructor(private readonly OrderRepo: Repository<Order>) {
    super(OrderRepo);
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
}
