import { dbContext } from "./database/db-context";
import { BaseRepository } from "./base.repository";
import { User } from "../models/user.entity";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

export class UserRepository extends BaseRepository<User> {
  constructor(private readonly userRepo: Repository<User>) {
    super(userRepo);
  }
  /**
   * Finds a cart by user ID.
   *
   * @param {number} user_id - The user ID to search for
   * @return {Promise<User | null>} The found cart object or null if not found
   */
  async get_user_by_id(user_id: number): Promise<User | null> {
    console.log("user_id", user_id);
    return await this.findOneBy({ user_id: user_id });
  }
  /**
   * Finds a cart by user ID.
   *
   * @param {string} email - The user ID to search for
   * @return {Promise<User | null>} The found cart object or null if not found
   */
  async get_user_by_email(email: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ email: email });
  }

  async create_user(data: object): Promise<User | null> {
    return await this.userRepo.create(data).save();
  }

  async update_verified_status(email: string): Promise<void> {
    const user: any = await this.userRepo.findOneBy({ email: email });
    user.is_activated = true;
    await this.userRepo.save(user);
  }
}

export const userRepository = new UserRepository(dbContext.getRepository(User));
