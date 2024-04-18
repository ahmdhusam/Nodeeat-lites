import { FindOptionsWhere } from "typeorm";
import {
  CartItemRepository,
  cartItemRepository,
} from "../repositry/CartItemRepository";
import { CartItem } from "../models/CartItem";

export class CartItemService {
  constructor(private readonly cartItemRepo: CartItemRepository) {}

  async findBy(where: FindOptionsWhere<CartItem>): Promise<CartItem[]> {
    return this.cartItemRepo.findBy(where);
  }

  async isExistBy(where: FindOptionsWhere<CartItem>): Promise<boolean> {
    return this.cartItemRepo.isExistBy(where);
  }

  async deleteBy(where: FindOptionsWhere<CartItem>): Promise<void> {
    await this.cartItemRepo.deleteBy(where);
  }
}

export const cartItemService = new CartItemService(cartItemRepository);
