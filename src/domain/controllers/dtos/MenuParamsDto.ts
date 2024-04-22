import { IsNumber, IsInt, IsPositive } from "class-validator";
import { RestaurantIdParamsDto } from "./RestaurantIdParamsDto";

export class MenuParamsDto extends RestaurantIdParamsDto {
  @IsPositive()
  @IsInt()
  @IsNumber()
  menuId: number;
}
