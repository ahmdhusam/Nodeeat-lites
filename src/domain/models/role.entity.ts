import { BaseEntityTemp } from "./templates/base.temp";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("role")
export class Role extends BaseEntityTemp {
  @PrimaryGeneratedColumn({ name: "role_id" })
  role_id: number;

  @Column({ unique: true })
  role_name: string;

  @Column()
  role_description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
