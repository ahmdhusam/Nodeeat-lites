import { NotFoundException } from "../../common/exceptions";
import { CartRepository, cartRepository } from "../repositry/cart.repository";
import { CartItemService, cartItemService } from "./cart-item.service";

export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly cartItemService: CartItemService
  ) {}

  // TODO: Make sure the cart belongs to the user
  async clear(cartId: number): Promise<void> {
    if (!(await this.cartRepo.isExistBy({ id: cartId }))) {
      throw new NotFoundException("Cart not found");
    }

    await this.cartItemService.deleteBy({ cartId });
  }
}

export const cartService = new CartService(cartRepository, cartItemService);
