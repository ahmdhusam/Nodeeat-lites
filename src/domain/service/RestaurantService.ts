import { FindOptionsWhere } from "typeorm";
import { NotFoundException } from "../../common/exceptions";
import { ConflictException } from "../../common/exceptions/ConflictException";
import { CreateRestaurantDto } from "../controllers/dtos/CreateRestaurantDto";
import { UpdateRestaurantDto } from "../controllers/dtos/UpdateRestaurantDto";
import {
  RestaurantRepository,
  restaurantRepository,
} from "../repositry/RestaurantRepository";
import { Restaurant } from "../models/Restaurant";
import { IPaginationOptions } from "../repositry/IPaginationOptions";

export class RestaurantService {
  constructor(private readonly restaurantRepo: RestaurantRepository) {}

  async createRestaurant(restaurantData: CreateRestaurantDto) {
    const isRestaurantExist = await this.restaurantRepo.isExistBy({
      name: restaurantData.name,
    });
    if (isRestaurantExist) {
      throw new ConflictException("Restaurant already exists");
    }

    const restaurant = this.restaurantRepo.create(restaurantData);

    return this.restaurantRepo.save(restaurant);
  }

  updateRestaurant(restaurantId: number, restaurantData: UpdateRestaurantDto) {
    const isRestaurantExist = this.restaurantRepo.isExistBy({
      id: restaurantId,
    });
    if (!isRestaurantExist) {
      throw new NotFoundException("Restaurant not found");
    }

    return this.restaurantRepo.update(restaurantId, restaurantData);
  }

  async enable(restaurantId: number) {
    const isRestaurantExist = this.restaurantRepo.isExistBy({
      id: restaurantId,
    });
    if (!isRestaurantExist) {
      throw new NotFoundException("Restaurant not found");
    }

    await this.restaurantRepo.update(restaurantId, { enabled: true });
  }

  async disable(restaurantId: number) {
    const isRestaurantExist = this.restaurantRepo.isExistBy({
      id: restaurantId,
    });
    if (!isRestaurantExist) {
      throw new NotFoundException("Restaurant not found");
    }

    await this.restaurantRepo.update(restaurantId, { enabled: false });
  }

  getManyAndPaginate(
    where: FindOptionsWhere<Restaurant>,
    paginationOptions: IPaginationOptions<Restaurant>
  ) {
    return this.restaurantRepo.getManyAndPaginate(where, paginationOptions);
  }

  isRestaurantExistBy(where: FindOptionsWhere<Restaurant>) {
    return this.restaurantRepo.isExistBy(where);
  }
}

export const restaurantService = new RestaurantService(restaurantRepository);
