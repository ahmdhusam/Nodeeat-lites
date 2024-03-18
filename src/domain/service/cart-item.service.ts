import { FindOptionsWhere } from "typeorm";
import {
  CartItemRepository,
  cartItemRepository,
} from "../repositry/cart-item.repository";
import { CartItem } from "../models/cart-item.entity";

export class CartItemService {
  constructor(private readonly cartItemRepo: CartItemRepository) {}

  async isExistBy(where: FindOptionsWhere<CartItem>): Promise<boolean> {
    return this.cartItemRepo.isExistBy(where);
  }

  async deleteBy(where: FindOptionsWhere<CartItem>): Promise<void> {
    await this.cartItemRepo.deleteBy(where);
  }
}

export const cartItemService = new CartItemService(cartItemRepository);
