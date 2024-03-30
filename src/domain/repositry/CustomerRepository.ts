import { FindOptionsWhere, Repository } from "typeorm";
import { Customer } from "../models/customer.entity";
import { BaseRepository } from "./base.repository";
import { dbContext } from "./database/db-context";

export class CustomerRepository extends BaseRepository<Customer> {
  constructor(private readonly OrderRepo: Repository<Customer>) {
    super(OrderRepo);
  }

  async findOneById(id: number): Promise<Customer | null> {
    return this.findOneBy({ id });
  }
}

export const customerRepository = new CustomerRepository(
  dbContext.getRepository(Customer)
);
