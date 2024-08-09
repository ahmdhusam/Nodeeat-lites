import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";
import { IClassConstructor } from "./IClassConstructor";

export const CatchErrors = () => (target: IClassConstructor) => {
  const descriptors = Object.getOwnPropertyDescriptors(target.prototype);

  for (const [propertyName, descriptor] of Object.entries(descriptors)) {
    const isMethod =
      descriptor.value instanceof Function && propertyName != "constructor";

    if (!isMethod) {
      continue;
    }

    const originalMethod = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        return await originalMethod.apply(this, [req, res, next]);
      } catch (error: unknown) {
        if (error instanceof HttpException) {
          return res.status(error.status).json({ error: error.message });
        }
        next(error);
      }
    };

    Object.defineProperty(target.prototype, propertyName, {
      configurable: true,
      get() {
        const bound = descriptor.value.bind(this);
        Object.defineProperty(this, propertyName, {
          ...descriptor,
          value: bound,
        });
        return bound;
      },
    });
  }
};
