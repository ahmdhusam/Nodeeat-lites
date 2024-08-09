import { FindOptionsOrder } from "typeorm";

export interface IPaginationOptions<T> {
  take?: number;
  skip?: number;
  orderBy?: FindOptionsOrder<T>;
}
