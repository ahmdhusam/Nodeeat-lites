import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Customer } from "./Customer";
import { OrderDetails } from "./OrderDetails";
import { OrderStatus } from "./OrderStatus";

@Entity("orders")
export class Order extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "order_id" })
  id: number;

  @Column({ type: "float" })
  order_total_amount: number;

  @Column()
  order_status_id: number;

  @ManyToOne(() => OrderStatus, (status) => status.order_status_id, {
    eager: true,
  })
  @JoinColumn({ name: "order_status_id" })
  order_status: OrderStatus;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.id)
  order_details: OrderDetails[];
}
