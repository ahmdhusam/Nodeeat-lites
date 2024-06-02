import { Transactional } from "typeorm-transactional";
import { Cart } from "../../models/Cart";
import { Order } from "../../models/Order";
import { OrderHandler } from "./IHandler";

export class OrderProcessor {
  public order: Order;
  public cart: Cart;
  errors: string[];
  constructor(
    public customerId: number,
    private handlers: OrderHandler[]
  ) {
    for (let index = 0; index < handlers.length; index++) {
      const element = handlers[index];
      if (index < handlers.length) element.Next = handlers[index + 1];
      element.OrderProcessor = this;
    }
  }

  public async Process(): Promise<Order | null> {
    await this.handlers[0].handle();

    //
    return this.order;
  }
}
