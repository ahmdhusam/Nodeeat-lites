import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { RestaurantCategory } from "./RestaurantCategory";

@Entity()
export class Restaurant extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "restaurant_id" })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  enabled: boolean;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column({ nullable: true })
  restaurant_category_id: number;

  @ManyToOne(
    () => RestaurantCategory,
    (restaurantCategory) => restaurantCategory.id
  )
  @JoinColumn({ name: "restaurant_category_id" })
  restaurantCategory: RestaurantCategory;
}
