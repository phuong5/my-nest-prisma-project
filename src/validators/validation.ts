import {
  IsEmail as _IsEmail,
  IsNotEmpty,
  IsIn as _IsIn,
  MinLength as _MinLength,
  MaxLength as _MaxLength,
  ValidationArguments,
} from 'class-validator';
import { get } from '../messages';
import { Unique as _Unique } from './unique-validator.service';

export const IsRequired = () =>
  IsNotEmpty({
    message: (args: ValidationArguments) => {
      return get('validation.required', { field: args.property });
    },
  });

export const IsEmail = () =>
  _IsEmail(
    {},
    {
      message: () => get('validation.email'),
    },
  );

export const IsIn = (values: number[] | string[]) =>
  _IsIn(values, {
    message: (args: ValidationArguments) => {
      return get('validation.not_in', { field: args.property });
    },
  });

export const MinLength = (min: number) =>
  _MinLength(min, {
    message: (args: ValidationArguments) => {
      console.log(args);

      return 'validation.required';
    },
  });

export const MaxLength = (min: number) =>
  _MaxLength(min, {
    message: (args: ValidationArguments) => {
      console.log(args);

      return 'validation.required';
    },
  });

export const Unique = (tableName: string) =>
  _Unique(tableName, {
    message: (args: ValidationArguments) => {
      return get('validation.not_in', { field: args.property });
    },
  });
