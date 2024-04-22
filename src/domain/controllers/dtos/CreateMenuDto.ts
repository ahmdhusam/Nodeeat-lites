import { IsInt, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreateMenuDto {
  @Length(3, 100)
  @IsString()
  name: string;

  @Length(3, 100)
  @IsString()
  description: string;

  @IsPositive()
  @IsInt()
  @IsNumber()
  menuCategoryId: number;
}
