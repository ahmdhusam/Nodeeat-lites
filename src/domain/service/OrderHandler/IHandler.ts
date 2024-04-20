import { Cart } from "../../models/Cart";

import { OrderProcessor } from "./OrderProcessor";

export interface IHandler {
  Next: IHandler;
  OrderProcessor: OrderProcessor;
  handle(): Promise<void>;
}
abstract class OrderHandler implements IHandler {
  public Next: IHandler;
  public OrderProcessor: OrderProcessor;

  constructor() {}
  abstract handle(): Promise<void>;
}

export class LockCartHandler extends OrderHandler {
  async handle(): Promise<void> {
    //todo
    if (!this.Next) return;
    this.Next.handle();
  }
}

export class InventoryCheckHandler extends OrderHandler {
  async handle(): Promise<void> {
    //todo

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
  async handle(): Promise<void> {
    //todo

    if (!this.Next) return;
    this.Next.handle();
  }
}

export class ReleaseLockCartHandler extends OrderHandler {
  async handle(): Promise<void> {
    //todo

    if (!this.Next) return;
    this.Next.handle();
  }
}
