import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Cart } from "./cart.entity";

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
}
