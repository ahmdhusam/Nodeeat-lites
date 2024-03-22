import { FindOptionsWhere, Repository } from "typeorm";
import { dbContext } from "./database/db-context";
import { CartItem } from "../models/cart-item.entity";
import { BaseRepository } from "./base.repository";

export class CartItemRepository extends BaseRepository<CartItem> {
  constructor(private readonly cartItemRepo: Repository<CartItem>) {
    super(cartItemRepo);
  }

  /**
   * Find items based on the specified options.
   *
   * @param {FindOptionsWhere<CartItem>} where - options to filter items
   * @return {Promise<CartItem[]>} list of items matching the criteria
   */
  findBy(where: FindOptionsWhere<CartItem>): Promise<CartItem[]> {
    return this.cartItemRepo.findBy(where);
  }

  /**
   * Finds a cart item by its ID.
   *
   * @param {number} id - the ID of the cart item to find
   * @return {Promise<CartItem | null>} the found cart item or null if not found
   */
  findOneById(id: number): Promise<CartItem | null> {
    return this.findOneBy({ id });
  }

  /**
   * Find items by cart ID.
   *
   * @param {number} id - The cart ID
   * @return {Promise<CartItem[]>} A promise that resolves to an array of cart items
   */
  findByCartId(id: number): Promise<CartItem[]> {
    return this.findBy({ cartId: id });
  }

  async deleteBy(where: FindOptionsWhere<CartItem>): Promise<void> {
    await this.cartItemRepo.delete(where);
  }
}

export const cartItemRepository = new CartItemRepository(
  dbContext.getRepository(CartItem)
);
