import { NextFunction, Request, Response } from "express";
import { IClassConstructor } from "../utiles/IClassConstructor";
import { transformAndValidate } from "../utiles/transformAndValidate";
import { HttpException } from "../exceptions";
import { BadRequestException } from "../exceptions/BadRequestException";

export function DtoMiddleware(
  dtoClass: IClassConstructor,
  propertyName: "body" | "query" | "params" = "body"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await transformAndValidate(dtoClass, req[propertyName]);
      req[propertyName] = dto;
      next();
    } catch (error: unknown) {
      if (error instanceof BadRequestException) {
        return res.status(error.status).json({ error: error.message });
      }

      next(error);
    }
  };
}
