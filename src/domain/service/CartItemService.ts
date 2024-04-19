import { FindOptionsWhere } from "typeorm";
import {
  CartItemRepository,
  cartItemRepository,
} from "../repositry/CartItemRepository";
import { CartItem } from "../models/CartItem";
import { CartRepository, cartRepository } from "../repositry/CartRepository";
import {
  MenuItemRepository,
  menuItemRepository,
} from "../repositry/MenuItemRepository";
import { NotFoundException } from "../../common/exceptions";
import { logger } from "../../common/logger";
export class CartItemService {
  constructor(
    private readonly cartItemRepo: CartItemRepository,
    private readonly cartRepo: CartRepository,
    private readonly menuRepo: MenuItemRepository
  ) {}

  async AddCartItem(customerId: number, menuItemId: number, quantity: number) {
    /*

- Get customerid 
- get customerCart 
- if no cart create cart 
-check menu item exists 
-check if item exists
- add cartitem 

*/
    let cart = await this.cartRepo.findOneBy({ customerId });
    if (!cart) {
      logger.debug(`no cart for customer: ${customerId}`);
      logger.debug(`create new cart `);
      cart = this.cartRepo.create({ customerId });
      cart.save();
    }

    let menuItem = await this.menuRepo.findOneById(menuItemId);
    if (!menuItem) {
      logger.error(`menuItem ${menuItemId} not found`);
      throw new NotFoundException("menuItem not found");
    }
    let cartItem = await this.cartItemRepo.findOneBy({
      cartId: cart.id,
      menuItemId: menuItemId,
    });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
    } else {
      const CartItem = cartItemRepository.create({
        cartId: cart.id,
        menuItemId: menuItemId,
        price: menuItem.price,
        quantity: quantity,
      });
      await CartItem.save();

      return CartItem;
    }
  }

  async DeleteCartItem(customerId: number, menuItemId: number) {
    /*
   -get CartFromCustomerid 
   -delete cartitem 
   */

    let cart = await this.cartRepo.findOneBy({ customerId });
    if (!cart) {
      throw new NotFoundException("cart not found");
    }

    let cartItem = await this.cartItemRepo.findOneBy({
      cartId: cart.id,
      menuItemId: menuItemId,
    });
    if (!cartItem) {
      throw new NotFoundException("cartItem not found");
    }

    await this.cartItemRepo.deleteById(menuItemId);
  }

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

export const cartItemService = new CartItemService(
  cartItemRepository,
  cartRepository,
  menuItemRepository
);
