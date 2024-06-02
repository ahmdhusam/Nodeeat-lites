import { cartItemController } from "../controllers/CartItemController";
import { router } from "./CartRouter";

router
  .route("/:customerId/cart/cart-items/:cartItemId")
  .delete(cartItemController.DeleteCartItem);
router
  .route("/:customerId/cart/cart-items/:menuItemId")
  .post(cartItemController.AddCartItem);

//custormer id in url only
