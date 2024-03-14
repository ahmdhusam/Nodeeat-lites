import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { Cart } from "../model/cart.entity";
import { dbContext } from "./database/db-context";
import { BaseRepository } from "./base.repository";

export class CartRepository extends BaseRepository<Cart> {
  constructor(private readonly cartRepo: Repository<Cart>) {
    super(cartRepo);
  }

  /**
   * Find a cart by ID.
   *
   * @param {number} id - The ID of the item to find.
   * @return {Promise<Cart | null>} The found item or null if not found.
   */
  async findOneById(id: number): Promise<Cart | null> {
    return this.findOneBy({ id });
  }

  /**
   * Finds a cart by customer ID.
   *
   * @param {number} id - The customer ID to search for
   * @return {Promise<Cart | null>} The found cart object or null if not found
   */
  async findByCustomerId(id: number): Promise<Cart | null> {
    return this.findOneBy({ customerId: id });
  }
}

export const cartRepository = new CartRepository(dbContext.getRepository(Cart));
