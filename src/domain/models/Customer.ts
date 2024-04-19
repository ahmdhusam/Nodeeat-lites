import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Cart } from "./cart.entity";
import { Order } from "./Order";

@Entity("customer")
export class Customer extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "customer_id" })
  id: number;

  @OneToOne(() => Cart, (cart) => cart.customer)
  cart: Cart;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
