import { NextFunction, Request, Response } from "express";
import { IClassConstructor } from "../utiles/IClassConstructor";
import { transformAndValidate } from "../utiles/transformAndValidate";
import { HttpException } from "../exceptions";
import { BadRequestException } from "../exceptions/BadRequestException";

export function DtoMiddleware(
  propertyName: "body" | "query" | "params" = "body",
  ...dtoClasses: IClassConstructor[]
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[propertyName];
      req[propertyName] = {};

      for (const dtoClass of dtoClasses) {
        const dto = await transformAndValidate(dtoClass, data);
        req[propertyName] = Object.assign({}, req[propertyName], dto);
      }

      next();
    } catch (error: unknown) {
      if (error instanceof BadRequestException) {
        return res.status(error.status).json({ error: error.message });
      }

      next(error);
    }
  };
}
