import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Customer } from "./customer.entity";

@Entity("cart")
export class Cart extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "cart_id" })
  id: number;

  @Column({ name: "total_amount", type: "money" })
  totalAmount: number;

  @Column({ name: "customer_id" })
  customerId: number;

  @OneToOne(() => Customer, (customer) => customer.cart)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;
}
