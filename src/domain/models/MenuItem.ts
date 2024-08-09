import {
  DeleteDateColumn,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Cart } from "./Cart";
import { CartItem } from "./CartItem";
import { OrderDetails } from "./OrderDetails";
import { RestaurantCategory } from "./RestaurantCategory";
import { Menu } from "./Menu";
import { MenuCategory } from "./MenuCategory";

@Entity("menu_item")
export class MenuItem extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "menu_item_id" })
  id: number;

  @Column()
  price: number;

  @Column({ name: "total_available", default: 10 })
  TotalAvailable: number;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.id)
  order_details: OrderDetails;
  
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "menu_id" })
  menuId: number;

  @ManyToOne(() => Menu, (menu) => menu.id)
  @JoinColumn({ name: "menu_id" })
  menu: Menu;

  @Column({ name: "menu_category_id" })
  menuCategoryId: number;

  @ManyToOne(() => MenuCategory, (menuCategory) => menuCategory.id)
  @JoinColumn({ name: "menu_category_id" })
  menuCategory: MenuCategory;
}
