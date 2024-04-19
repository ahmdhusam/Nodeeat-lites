import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityTemp } from "./templates/base.temp";

@Entity()
export class Address extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "address_id" })
  id: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column({ name: "full_address" })
  fullAddress: string;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
