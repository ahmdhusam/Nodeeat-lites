import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("order_status")
export class OrderStatus {
  @PrimaryGeneratedColumn({ name: "order_status_id" })
  order_status_id: number;

  @Column({ length: 20 })
  status: string;
}
