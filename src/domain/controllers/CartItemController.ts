import { Request, Response } from "express";
import { cartItemRepository } from "../repositry/CartItemRepository";
import { cartRepository } from "../repositry/CartRepository";
import { logger } from "../../common/logger";
import { StatusCodes } from "http-status-codes";

export const addCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  /*

- Get customerid 
- get customerCart 
- if no cart create cart 
- add cartitem 

*/

  const cartId = parseInt(req.params.cartId);
  const cartItemId = parseInt(req.params.cartItemId);
  const customerId = parseInt(req.params.customerId);
  const quantity: number = parseInt(req.query.quantity as string);

  logger.debug(
    `CustomerId:${customerId}, CartId:${cartId},CartItemId:${cartItemId},quantity:${quantity}`
  );

  try {
    const cart = await cartRepository.findOneById(cartId);
    if (!cart) {
      // const cartId = await createCart(req, res);
    }
  } catch (error: any) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
    return;
  }

  // TODO: check if the menu_item exist or not.

  //   try {
  //     const cart = await cartRepository.findOneById(cartId);
  //     if (!cart) {
  //       throw Error("Cart does not exist");
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //     res.status(400).json({ message: error.message });
  //     return;
  //   }

  // check if the item exist already or not.
  try {
    const Cart_item = await cartItemRepository.findOneBy({
      cartId,
      menuItemId: cartItemId,
    });
    if (Cart_item) {
      res.status(400).json({ details: "Item already exist" });
      return;
    }
  } catch (error) {
    res.status(422).json({ message: error });
  }

  // create new Cart_item.
  try {
    const Cart_item = cartItemRepository.create({
      cartId,
      menuItemId: cartItemId,
      price: 10,
      quantity: 1,
    });
    await Cart_item.save();

    res.status(200).json({ details: Cart_item });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const viewCartItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  const customerId = parseInt(req.params.customerId);

  logger.debug(`customerId:${customerId}`);
  try {
    const cartItems = await cartItemRepository.findByCartId(cartId);
    res.status(200).json({ details: cartItems });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};
