import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Customer } from "./customer.entity";

@Entity("Order")
export class Order extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "order_id" })
  id: number;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" })
  updated_at: Date;

  @Column({ type: "float" })
  order_total_amount: number;

  @Column({ type: "integer" })
  order_status: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
}
