import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { User } from "./user.entity";

@Entity("customer")
export class Customer extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "customer_id" })
  id: number;

  @OneToOne(() => Cart, (cart) => cart.customer)
  cart: Cart;

  @OneToOne(() => User, (user) => user.customer)
  user: User;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
  @Column({ type: "character varying", nullable: true })
  login_name: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  last_visit: Date;

  // @Column()
  // username: string;

  // @Column({ unique: true })
  // email: string;
}
