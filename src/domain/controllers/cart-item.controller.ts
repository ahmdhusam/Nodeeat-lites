import { Request, Response } from "express";
import { cartItemRepository } from "../repositry/cart-item.repository";
import { cartRepository } from "../repositry/cart.repository";

export const addCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cartId = parseInt(req.params.cartId);
  const cartItemId = parseInt(req.params.cartItemId);

  console.log(cartItemId, cartId);
  try {
    const cart = await cartRepository.findOneById(cartId);
    if (!cart) {
      throw Error("Cart does not exist");
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
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
  const cartId = parseInt(req.params.cartId);

  console.log(cartId);
  try {
    const cartItems = await cartItemRepository.findByCartId(cartId);
    res.status(200).json({ details: cartItems });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};
