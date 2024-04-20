import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Cart } from "./cart.entity";
import { CartItem } from "./cart-item.entity";
import { OrderDetails } from "./OrderDetails";

@Entity("menu_item")
export class MenuItem extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "menu_item_id" })
  id: number;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.id)
  order_details: OrderDetails;
}
