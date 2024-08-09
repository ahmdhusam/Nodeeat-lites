import { IsOptional, IsString, Length } from "class-validator";

export class NameOptionsQueryDto {
  @Length(3, 100)
  @IsString()
  @IsOptional()
  name: string;
}
