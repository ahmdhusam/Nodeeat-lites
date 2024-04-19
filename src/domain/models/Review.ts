import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { MenuItem } from "./MenuItem";
import { Customer } from "./Customer";

@Entity()
export class Review extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "review_id" })
  id: number;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: "menu_item_id" })
  menuItemId: number;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.id)
  @JoinColumn({ name: "menu_item_id" })
  menuItem: MenuItem;

  @Column({ name: "customer_id" })
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;
}
