import { IsNumber, IsInt, IsPositive } from "class-validator";

export class RestaurantIdParamsDto {
  @IsPositive()
  @IsInt()
  @IsNumber()
  restaurantId: number;
}
