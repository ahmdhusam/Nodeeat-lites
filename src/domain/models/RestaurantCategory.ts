import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";

@Entity("restaurant_category")
export class RestaurantCategory extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "restaurant_category_id" })
  id: number;

  @Column()
  name: string;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
