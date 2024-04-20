import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { BaseEntityTemp } from "./templates/base.temp";
import { MenuItem } from "./MenuItem";

@Entity("order_details")
export class OrderDetails extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "order_details_id" })
  id: number;

  @Column({ type: "float" })
  order_details_price: number;

  @Column({ type: "integer" })
  order_details_quantity: number;

  @Column({ name: "menu_item_id", nullable: true })
  menu_itemId: number;

  @OneToOne(() => MenuItem)
  menu_item: MenuItem;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: "order_id" })
  order: Order;
  orderDetails: Promise<MenuItem | null>;
}
