import { Request, Response } from "express";
import { cartRepository } from "../repositry/CartRepository";
import { cartItemRepository } from "../repositry/CartItemRepository";
import { CartService, cartService } from "../service/CartService";
import { HttpException } from "../../common/exceptions";
import { logger } from "../../common/logger";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
class CartController {
  constructor(private readonly cartService: CartService) {}

  async GetCart(req: Request, res: Response): Promise<void> {
    const customerId = parseInt(req.params.customerId);

    logger.debug(`customerId:${customerId}`);
    try {
      const cart = await this.cartService.GetCartByCustomerId(customerId);
      res.status(StatusCodes.OK).json({ details: cart });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  }

  async ClearCart(req: Request, res: Response): Promise<void> {
    try {
      const customerId = parseInt(req.params.customerId);

      await cartService.clear(customerId);

      res.status(StatusCodes.OK).json({ message: "Cart cleared successfully" });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  }
}
export const cartController = new CartController(cartService);
