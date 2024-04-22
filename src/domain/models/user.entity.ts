import { Customer } from "./customer.entity";
import { Role } from "./role.entity";
import { BaseEntityTemp } from "./templates/base.temp";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserType } from "./user-type.entity";

@Entity("user")
export class User extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "user_id" })
  user_id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column()
  password: string;

  @Column({ type: "boolean", default: false })
  is_activated: boolean;

  @Column({ type: "boolean", default: false })
  is_deleted: boolean;

  @Column({ type: "boolean", default: false })
  is_superuser: boolean;

  @OneToOne(() => UserType, (usertype) => usertype.user, { nullable: true })
  user_type: UserType;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @ManyToMany(() => Role, (role) => role.users, { nullable: true })
  @JoinTable()
  roles: Role[];
}
