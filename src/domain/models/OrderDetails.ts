import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { MenuItem } from "./menu-item.entity";
import { BaseEntityTemp } from "./templates/base.temp";

@Entity()
export class OrderDetails extends BaseEntityTemp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" })
  updated_at: Date;

  @Column({ type: "float" })
  order_details_price: number;

  @Column({ type: "integer" })
  order_details_quantity: number;

  // @ManyToOne(() => MenuItem, menuItem => menuItem.orderDetails)
  // menu_item: MenuItem;

  // @ManyToOne(() => Order, order => order.orderDetails)
  // order: Order;
}
