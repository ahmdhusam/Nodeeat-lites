import { NotFoundException } from "../../common/exceptions";
import { Cart } from "../models/Cart";
import { CartRepository, cartRepository } from "../repositry/CartRepository";
import { CartItemService, cartItemService } from "./CartItemService";

export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly cartItemService: CartItemService
  ) {}

  async getCartById(cartId: number) {
    const cart = await this.cartRepo.findOneById(cartId);
    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    return cart;
  }

  async calculateTotalPrice(cartId: number): Promise<number> {
    // TODO: Use database to calculate total price or calculate it on the server

    const cartItems = await this.cartItemService.findBy({ cartId });

    let total = 0;

    for (const item of cartItems) {
      total += item.price * item.quantity;
    }

    return total;
  }

  // TODO: Make sure the cart belongs to the user
  async clear(cartId: number): Promise<void> {
    const cart = await this.cartRepo.findOneById(cartId);
    if (!cart) throw new NotFoundException("Cart not found");

    await this.cartItemService.deleteBy({ cartId });

    cart.totalAmount = 0; // await this.calculateTotalPrice(cart.id); // Or set it to 0 directly

    await this.cartRepo.save(cart);
  }
}

export const cartService = new CartService(cartRepository, cartItemService);
