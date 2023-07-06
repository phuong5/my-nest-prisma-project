import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from '../services/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  public async validate(value: string, args: ValidationArguments) {
    const tableName = args.constraints[0] || '';
    const table: any = this.prisma[tableName];
    const property = args.property;
    if (table) {
      const where = {};
      where[property] = value;

      const user = await table.findUnique({
        where,
      });
      return !user;
    }

    return true;
  }

  public defaultMessage(args: ValidationArguments) {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';
    return `${entity} with the same '${args.property}' already exist`;
  }
}

export function Unique(
  tableName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueValidator,
      constraints: [tableName],
    });
  };
}
