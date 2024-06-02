import { IsDate, IsString, Length } from "class-validator";
import { Restaurant } from "../../models/Restaurant";
import { SaveOptions, RemoveOptions } from "typeorm";
import { RestaurantCategory } from "../../models/RestaurantCategory";
import { RestaurantBranch } from "../../models/RestaurantBranch";
import { Address } from "../../models/Address";
import { RestaurantStatus } from "../../models/RestaurantStatus";

export class CreateRestaurantDto {
  @Length(3, 100)
  @IsString()
  name: string;

  @Length(3, 255)
  @IsString()
  description: string;

  // @Length(3, 100)
  // @IsString()
  // categoryName: string;

  // @IsDate()
  // openingTime: Date;

  // @IsDate()
  // closingTime: Date;

  // @Length(1, 100)
  // @IsString()
  // city: string;

  // @Length(1, 100)
  // @IsString()
  // street: string;

  // @Length(1, 100)
  // @IsString()
  // fullAddress: string;
}
