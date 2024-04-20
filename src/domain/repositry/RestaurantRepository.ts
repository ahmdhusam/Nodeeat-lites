import { Repository } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Restaurant } from "../models/Restaurant";
import { dbContext } from "./database/db-context";

export class RestaurantRepository extends BaseRepository<Restaurant> {
  constructor(private readonly restaurantRepository: Repository<Restaurant>) {
    super(restaurantRepository);
  }
}

export const restaurantRepository = new RestaurantRepository(
  dbContext.getRepository(Restaurant)
);
