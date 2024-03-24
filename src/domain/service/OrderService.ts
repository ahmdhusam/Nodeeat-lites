import { NotFoundException } from "../../common/exceptions";
import { OrderRepository } from "../repositry/OrderRepositry";

export class CartService {
  constructor(private readonly orderRepo: OrderRepository) {}
}
