import { ConflictException } from "../../common/exceptions/ConflictException";
import { CreateRestaurantDto } from "../controllers/dtos/CreateRestaurantDto";
import {
  RestaurantRepository,
  restaurantRepository,
} from "../repositry/RestaurantRepository";

export class RestaurantService {
  constructor(private readonly restaurantRepo: RestaurantRepository) {}

  async createRestaurant(restaurantData: CreateRestaurantDto) {
    const isRestaurantExist = await this.restaurantRepo.isExistBy({
      name: restaurantData.name,
    });
    if (isRestaurantExist) {
      throw new ConflictException("Restaurant already exists");
    }

    return this.restaurantRepo.create(restaurantData);
  }
}

export const restaurantService = new RestaurantService(restaurantRepository);
