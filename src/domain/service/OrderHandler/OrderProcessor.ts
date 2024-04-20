import { Cart } from "../../models/Cart";
import { Order } from "../../models/Order";
import { IHandler } from "./IHandler";

export class OrderProcessor {
  constructor(
    public cart: Cart,
    public order: Order,
    private handlers: IHandler[]
  ) {
    for (let index = 0; index < handlers.length; index++) {
      const element = handlers[index];
      if (index < handlers.length) element.Next = handlers[index + 1];
      element.OrderProcessor = this;
    }
  }

  public async Process(): Promise<Order | null> {
    await this.handlers[0].handle();
    return this.order;
  }
}
