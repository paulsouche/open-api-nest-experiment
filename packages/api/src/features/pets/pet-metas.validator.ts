import { Type } from '@nestjs/common';
import { registerDecorator, validate, ValidationArguments, ValidationOptions, Validator } from 'class-validator';
import CommonMetasDto from './models/metas/common-meta.dto';
import { PetKindEnum, PetKindKeys } from './models/pet-kind';
import PetDto from './models/pet.dto';

const validator = new Validator();

export type PetMetaModels = {
  [kind in PetKindKeys]: Type<CommonMetasDto>;
};

export function IsPetMetas(validators: PetMetaModels, validationOptions?: Omit<ValidationOptions, 'omit'>) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      constraints: ['isPetMeta'],
      name: 'isPetMeta',
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        validate: async (value: unknown, args: ValidationArguments) => {
          if (!validator.isDefined(value)) {
            return true;
          }

          if (!validator.isObject(value)) {
            return false;
          }

          const { kind } = args.object as PetDto;

          if (!validator.isIn(kind, PetKindEnum)) {
            return true;
          }

          const metas = Object.assign(new validators[kind](), value);

          const errors = await validate(metas, {
            forbidNonWhitelisted: true,
            whitelist: true,
          });

          return !errors.length;
        },
      },
    });
  };
}
