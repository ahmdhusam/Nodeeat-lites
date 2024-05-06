import { NotFoundException } from "../../common/exceptions";
import { ResourceLockedException } from "../../common/exceptions/ResourceLockedException";
import { Cart } from "../models/Cart";
import { CartRepository, cartRepository } from "../repositry/CartRepository";
import { CartItemService, cartItemService } from "./CartItemService";

export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly cartItemService: CartItemService
  ) {}

  async lockCart(customerId: number) {
    let cart = await this.getCartByCustomerId(customerId);

    if (cart.isLocked) {
      throw new ResourceLockedException("Cart is locked");
    }
    cart.isLocked = true;
    await this.cartRepo.save(cart);
  }
  async unlockCart(customerId: number) {
    let cart = await this.getCartByCustomerId(customerId);

    if (!cart.isLocked) {
      throw new ResourceLockedException("Cart isn't locked");
    }
    cart.isLocked = false;
    await this.cartRepo.save(cart);
  }
  async getCartByCustomerId(customerId: number) {
    const cart = await this.cartRepo.findOneBy({ customerId });
    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    return cart;
  }

  async CalculateTotalPrice(cartId: number): Promise<number> {
    const cartItems = await this.cartItemService.findBy({ cartId });

    let total = 0;

    for (const item of cartItems) {
      total += item.price * item.quantity;
    }

    return total;
  }

  async clear(customerId: number): Promise<void> {
    const cart = await this.cartRepo.findOneBy({ customerId });
    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    await this.cartItemService.deleteBy({ cartId: cart.id });

    cart.totalAmount = 0; // await this.calculateTotalPrice(cart.id); // Or set it to 0 directly

    await this.cartRepo.save(cart);
  }
}

export const cartService = new CartService(cartRepository, cartItemService);
