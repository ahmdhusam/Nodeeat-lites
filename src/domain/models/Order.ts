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

@Entity("orders")
export class Order extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "order_id" })
  id: number;

  @Column({ type: "money" })
  order_total_amount: number;

  @Column({ type: "integer" })
  order_status: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.id)
  order_details: OrderDetails[];
}
