import { Length, IsString } from "class-validator";

export class UpdateRestaurantDto {
  @Length(3, 100)
  @IsString()
  name: string;

  @Length(3, 255)
  @IsString()
  description: string;
}
