import { Customer } from "../models/customer.entity";
import {
  CustomerRepository,
  customerRepository,
} from "../repositry/CustomerRepository";

export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async findById(id: number): Promise<Customer | null> {
    return await this.customerRepo.findOneById(id);
  }
}
export const customerService = new CustomerService(customerRepository);
