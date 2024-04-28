import { FindOptionsOrder } from "typeorm";
import { IPaginationOptions } from "../../repositry/IPaginationOptions";
import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationOptionsParamsDto {
  @IsInt()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  page: number;
}
