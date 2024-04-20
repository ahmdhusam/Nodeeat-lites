import { Request, Response } from "express";
import { cartItemRepository } from "../repositry/CartItemRepository";
import { cartRepository } from "../repositry/CartRepository";
import { logger } from "../../common/logger";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { CartItemService, cartItemService } from "../service/CartItemService";

class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  async AddCartItem(req: Request, res: Response): Promise<void> {
    const customerId = parseInt(req.params.customerId);
    const menuItemId = parseInt(req.params.menuItemId);
    const quantity: number = parseInt(req.query.quantity as string);

    logger.debug(
      `CustomerId:${customerId},menuItemId:${menuItemId},quantity:${quantity}`
    );
    try {
      let cartItem = await this.cartItemService.AddCartItem(
        customerId,
        menuItemId,
        quantity
      );

      res.status(StatusCodes.CREATED).json(cartItem);
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  }

  async DeleteCartItem(req: Request, res: Response): Promise<void> {
    try {
      const customerId = parseInt(req.params.customerId);
      const menuItemId = parseInt(req.params.menuItemId);
      await this.cartItemService.DeleteCartItem(customerId, menuItemId);

      res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  }
}

export const cartItemController = new CartItemController(cartItemService);
