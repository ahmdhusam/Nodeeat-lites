import { DeepPartial, FindOptionsWhere } from "typeorm";
import { Order } from "../models/Order";
import { orderRepository, OrderRepository } from "../repositry/OrderRepositry";
import {
  cartItemRepository,
  CartItemRepository,
} from "../repositry/cart-item.repository";
import { OrderDetails } from "../models/OrderDetails";
import {
  menuItemRepository,
  MenuItemRepository,
} from "../repositry/MenuItemRepository";
import { CartService, cartService } from "./CartService";
import { NotFoundException } from "../../common/exceptions";
import { BadRequestException } from "../../common/exceptions/BadRequestException";

export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly cartService: CartService
  ) {}

  async PlaceOrder(cartId: number) {
    const cart = await this.cartService.getCartById(cartId);
    const { cartItems } = cart;

    if (cartItems.length < 1) {
      throw new BadRequestException("Cart is empty");
    }
    const order_details: DeepPartial<OrderDetails>[] = cartItems.map(
      (item) => ({
        menu_itemId: item.menuItemId,
        order_details_price: item.price,
        order_details_quantity: item.quantity,
      })
    );

    const createdOrder = await this.orderRepo.createOrder({
      customer: { id: cart.customerId },
      order_status: 1,
      order_total_amount: cart.totalAmount,
      order_details,
    });

    await this.cartService.clear(cartId);

    return createdOrder;
  }

  async findBy(where: FindOptionsWhere<Order>): Promise<Order[]> {
    return await this.orderRepo.findBy(where);
  }
  async historyOfOrders(id: number): Promise<Order | string | null> {
    return this.orderRepo.historyOfOrders(id);
  }
  async detailsOfOrders(id: number): Promise<Order | null> {
    return this.orderRepo.detailsOfOrders(id);
  }
}

export const orderService = new OrderService(orderRepository, cartService);
