import { Request, Response } from "express";
import { cartRepository } from "../repositry/cart.repository";
import { cartItemRepository } from "../repositry/cart-item.repository";
import { cartService } from "../service/cart.service";
import { HttpException } from "../../common/exceptions";

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

export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cartId = parseInt(req.params.cartId);

    await cartService.clear(cartId);

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error: unknown) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again later" });
    }
  }
};
