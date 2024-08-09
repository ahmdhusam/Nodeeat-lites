import { Customer } from "./customer.entity";
import { BaseEntityTemp } from "./templates/base.temp";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("user_type")
export class UserType extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "user_type_id" })
  user_type_id: number;

  @Column({type:"character varying",unique:true})
  user_type_name:string;

  @OneToOne(() => User, (user) => user.user_type)
  user:User
}
