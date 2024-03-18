import { Request, Response } from "express";
import { cartRepository } from "../repositry/cart.repository";
import { cartItemRepository } from "../repositry/cart-item.repository";

// export const getCart = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const cartId = parseInt(req.params.cartId);
//     let cart = await cartRepository.findOneById(cartId);

//     console.log("cart controller");
//     res.status(200).json({ cart });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const deleteCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cartId = parseInt(req.params.cartId);
    await cartItemRepository.deleteById(cartId);

    res.status(200).json({});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
