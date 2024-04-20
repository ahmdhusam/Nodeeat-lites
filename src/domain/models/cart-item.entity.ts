import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Cart } from "./cart.entity";
import { MenuItem } from "./MenuItem";

@Entity("cart_items")
export class CartItem extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "cart_items_id" })
  id: number;

  @Column({ type: "money" })
  price: number;

  @Column()
  quantity: number;

  @Column({ name: "cart_id" })
  cartId: number;

  @ManyToOne(() => Cart, (cart) => cart.id)
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

  @Column({ name: "menu_item_id" })
  menuItemId: number;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.id)
  @JoinColumn({ name: "menu_item_id" })
  menuItem: MenuItem;
}
