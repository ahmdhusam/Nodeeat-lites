import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

export function MaxArrayDepth(maxDepth: number) {
  return function (target: object, propertyName: string) {
    registerDecorator({
      name: IsMaxDepth.name,
      target: target.constructor,
      propertyName: propertyName,
      constraints: [maxDepth],
      validator: IsMaxDepth,
    });
  };
}

@ValidatorConstraint({ name: IsMaxDepth.name, async: false })
export class IsMaxDepth implements ValidatorConstraintInterface {
  validate(value: any[], args: ValidationArguments) {
    const [maxDepth] = args.constraints;
    console.log(value.map((item) => this.getDepth(item)));
    let i = 0;
    return !value.some(
      (item) => (console.log(++i), this.getDepth(item) > maxDepth)
    );
  }

  getDepth(value: any): number {
    if (!Array.isArray(value)) return 0;
    return 1 + Math.max(...value.map((item) => this.getDepth(item)));
  }

  defaultMessage(args: ValidationArguments) {
    const [maxDepth] = args.constraints;
    return `Array depth must not exceed ${maxDepth}`;
  }
}
