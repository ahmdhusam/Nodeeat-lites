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
import { OrderStatus } from "../../common/enums/OrderStatusEnum";

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
      order_status_id: 1,
      order_total_amount: cart.totalAmount,
      order_details,
    });

    await this.cartService.clear(cartId);

    return createdOrder;
  }

  async cancelOrder(customerId: number, orderId: number) {
    const order = await this.getOneOrderBy({
      id: orderId,
      customer: { id: customerId },
    });

    if (order.order_status_id === OrderStatus.CANCELLED)
      throw new BadRequestException("Order already cancelled");

    if (order.order_status_id === OrderStatus.DELIVERED)
      throw new BadRequestException("Order already delivered");

    // TODO: ! Notify Restaurant to cancel this order

    order.order_status_id = OrderStatus.CANCELLED;
    await this.orderRepo.save(order);
  }

  async getOrderStatus(customerId: number, orderId: number): Promise<string> {
    const order = await this.getOneOrderBy({
      id: orderId,
      customer: { id: customerId },
    });

    return order.order_status.status;
  }

  async getOneOrderBy(where: FindOptionsWhere<Order>): Promise<Order> {
    const order = await this.orderRepo.findOneBy(where);

    if (!order) throw new NotFoundException("Order not found");

    return order;
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
