import { FindOptionsWhere } from "typeorm";
import { NotFoundException } from "../../common/exceptions";
import { Order } from "../models/Order";
import { orderRepository, OrderRepository } from "../repositry/OrderRepositry";
import { cartRepository, CartRepository } from "../repositry/CartRepository";
import {
  cartItemRepository,
  CartItemRepository,
} from "../repositry/cart-item.repository";
import { forEachChild } from "typescript";
import { OrderDetails } from "../models/OrderDetails";
import {
  menuItemRepository,
  MenuItemRepository,
} from "../repositry/MenuItemRepository";

export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly menuRepo: MenuItemRepository,
    private readonly cartItemsRepo: CartItemRepository
  ) {}
  async PlaceOrder(cartId: number): Promise<Order> {
    let cartItems = await this.cartItemsRepo.findByCartId(cartId);

    console.log(cartItems);
    let order = new Order();
    let orderDetails: OrderDetails[] = [];
    for (const cartItem of cartItems) {
      let orderDetail = new OrderDetails();
      orderDetail.menu_itemId = cartItem.menuItemId;

      // orderDetail.order = order;
      orderDetail.order_details_quantity = cartItem.quantity;
      orderDetail.order_details_price = cartItem.price;
      orderDetails.push(orderDetail);
    }
    order.order_details = orderDetails;
    order.order_status = 1;
    order.order_total_amount = 0;

    // orderDetails.forEach(
    //   (a) =>
    //     (order.order_total_amount +=
    //       a.order_details_price * a.order_details_quantity)
    // );

    console.log(order);
    console.log("---BeforeCreate---");
    let createdOrder = this.orderRepo.create(order);
    console.log("---AfterCreate---");
    console.log(createdOrder);
    console.log("---before save---");
    var saved = await this.orderRepo.save(createdOrder);
    console.log(saved);
    console.log("---after save---");
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

export const orderService = new OrderService(
  orderRepository,
  menuItemRepository,
  cartItemRepository
);
