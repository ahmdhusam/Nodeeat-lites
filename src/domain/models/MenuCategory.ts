import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";

@Entity({ name: "menu_category" })
export class MenuCategory extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "menu_category_id" })
  id: number;

  @Column()
  name: string;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
