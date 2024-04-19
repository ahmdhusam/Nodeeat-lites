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
import { Restaurant } from "./Restaurant";
import { MenuCategory } from "./MenuCategory";

@Entity()
export class Menu extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "menu_id" })
  id: number;

  @Column()
  name: string;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column()
  description: string;

  @Column({ name: "menu_category_id" })
  menuCategoryId: number;

  @ManyToOne(() => MenuCategory, (menuCategory) => menuCategory.id)
  @JoinColumn({ name: "menu_category_id" })
  menuCategory: MenuCategory;

  @Column({ name: "restaurant_id" })
  restaurantId: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Restaurant;
}
