import { Length, IsString } from "class-validator";

export class CreateMenuItemDto {
  @Length(3, 100)
  @IsString()
  name: string;

  @Length(3, 100)
  @IsString()
  description: string;
}
