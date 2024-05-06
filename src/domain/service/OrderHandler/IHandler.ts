import { ResourceLockedException } from "../../../common/exceptions/ResourceLockedException";
import { logger } from "../../../common/logger";
import { Cart } from "../../models/Cart";
import { Order } from "../../models/Order";
import { OrderDetails } from "../../models/OrderDetails";
import { CartRepository } from "../../repositry/CartRepository";
import { OrderRepository } from "../../repositry/OrderRepositry";
import { CartService } from "../CartService";
import { MenuItemService } from "../MenuItemService";
import { OrderService } from "../OrderService";

import { OrderProcessor } from "./OrderProcessor";

export abstract class OrderHandler {
  public Next: OrderHandler;
  public OrderProcessor: OrderProcessor;

  constructor() {}
  abstract handle(): Promise<void>;
}

export class LockCartHandler extends OrderHandler {
  constructor(private cartService: CartService) {
    super();
  }
  async handle(): Promise<void> {
    await this.cartService.lockCart(this.OrderProcessor.customerId);

    if (!this.Next) return;
    this.Next.handle();
  }
}

export class InventoryCheckHandler extends OrderHandler {
  constructor(
    private menuItemSerivce: MenuItemService,
    private cartService: CartService
  ) {
    super();
  }

  async handle(): Promise<void> {
    let cart = await this.cartService.getCartByCustomerId(
      this.OrderProcessor.customerId
    );
    this.OrderProcessor.cart = cart;
    cart.cartItems.forEach((ci) =>
      this.menuItemSerivce.checkAvailabilty(ci.menuItemId, ci.quantity)
    );

    if (!this.Next) return;
    this.Next.handle();
  }
}

export class PaymentHandler extends OrderHandler {
  async handle(): Promise<void> {
    //todo

    if (!this.Next) return;
    this.Next.handle();
  }
}
export class OrderCreateHandler extends OrderHandler {
  constructor(private orderRepo: OrderRepository) {
    super();
  }
  async handle(): Promise<void> {
    let orderDetails: OrderDetails[] = [];
    logger.info(this.OrderProcessor.cart);
    console.log(this.OrderProcessor.cart);
    if (!this.OrderProcessor.cart) return;
    this.OrderProcessor.cart.cartItems.forEach((ci) => {
      let orderdetail: OrderDetails = new OrderDetails();
      orderdetail.menu_itemId = ci.menuItemId;
      orderdetail.order_details_quantity = ci.quantity;
      orderdetail.order_details_price = ci.price;

      orderDetails.push(orderdetail);
    });
    const createdOrder = await this.orderRepo.createOrder({
      customer: { id: this.OrderProcessor.customerId },
      order_status: 1,
      order_total_amount: this.OrderProcessor.cart.totalAmount,
      order_details: orderDetails,
    });

    this.orderRepo.save(createdOrder);
    this.OrderProcessor.order = createdOrder;
    if (!this.Next) return;
    this.Next.handle();
  }
}

export class ReleaseLockCartHandler extends OrderHandler {
  constructor(private cartService: CartService) {
    super();
  }
  async handle(): Promise<void> {
    await this.cartService.unlockCart(this.OrderProcessor.customerId);

    if (!this.Next) return;
    this.Next.handle();
  }
}
