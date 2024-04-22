import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Cart } from "./cart.entity";
import { User } from "./user.entity";

@Entity("customer")
export class Customer extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "customer_id" })
  id: number;

  @OneToOne(() => Cart, (cart) => cart.customer)
  cart: Cart;

  @OneToOne(() => User, (user) => user.customer)
  user: User;

  @Column({ type: "character varying", nullable: true })
  login_name: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  last_visit: Date;

  // @Column()
  // username: string;

  // @Column({ unique: true })
  // email: string;
}
