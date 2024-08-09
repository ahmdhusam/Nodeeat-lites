import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import { MenuItem } from "../../models/MenuItem";
import { SaveOptions, RemoveOptions } from "typeorm";
import { Menu } from "../../models/Menu";
import { MenuCategory } from "../../models/MenuCategory";
import { MaxArrayDepth } from "../../../common/utiles/IsMaxDepth";
import { Type } from "class-transformer";
import { CreateMenuItemDto } from "./CreateMenuItemDto";

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

  @ArrayUnique((menuItem) => menuItem.name)
  @Type(() => CreateMenuItemDto)
  @ValidateNested()
  @MaxArrayDepth(0)
  @IsArray()
  menuItems: CreateMenuItemDto[];
}
