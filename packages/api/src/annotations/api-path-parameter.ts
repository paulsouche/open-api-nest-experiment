import { Type } from '@nestjs/common';
import { ParameterObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';

export interface ApiPathParameterOptions extends Partial<Omit<ParameterObject, 'in' | 'schema'>> {
    type?: Type<unknown> | Type<any> | [Type<any>] | string;
    enum?: SwaggerEnumType;
}

export default (metadata: ApiPathParameterOptions): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    const property = propertyKey.toString();
    metadata.name = metadata.name || property;
    metadata.type = metadata.type || Reflect.getMetadata('design:type', target, propertyKey);
    metadata.required = metadata.required || true;
    Reflect.defineMetadata(`apiParameter-${property}`, { ...metadata, in: 'path' }, target.constructor);
  };
};
