import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { BadRequestException } from "../exceptions/BadRequestException";
import { IClassConstructor } from "./IClassConstructor";

export async function transformAndValidate<T extends object>(
  dtoClass: IClassConstructor<T>,
  input: object
): Promise<T> {
  const dtoInstance = plainToInstance(dtoClass, input);

  const errors: ValidationError[] = await validate(dtoInstance, {
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  });

  if (errors.length > 0) {
    throw new BadRequestException(
      Object.values(errors[0].constraints ?? {})[0]
    );
  }

  return dtoInstance;
}
