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

@Entity()
export class Ingredient extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "ingredient_id" })
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column({ name: "menu_item_id" })
  menuItemId: number;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.id)
  @JoinColumn({ name: "menu_item_id" })
  menuItem: MenuItem;
}
