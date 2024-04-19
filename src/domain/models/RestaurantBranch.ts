import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";
import { Restaurant } from "./Restaurant";
import { Address } from "./Address";
import { RestaurantStatus } from "./RestaurantStatus";

@Entity("restaurant_branch")
export class RestaurantBranch extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "restaurant_branch_id" })
  id: number;

  @Column({ type: "enum", enum: RestaurantStatus })
  status: RestaurantStatus;

  @Column({ name: "opening_time", type: "time" })
  openingTime: Date;

  @Column({ name: "closing_time" })
  closingTime: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column({ name: "restaurant_id" })
  restaurantId: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Restaurant;

  @Column({ name: "address_id" })
  addressId: number;

  @ManyToOne(() => Address, (address) => address.id)
  @JoinColumn({ name: "address_id" })
  address: Address;
}
