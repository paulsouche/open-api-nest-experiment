import { Type } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';

export default (...models: Array<Type<any>>): MethodDecorator => {
  const decorators = models.reduce(
    (dcrtrs: MethodDecorator[], model) =>
      Reflect.getMetadataKeys(model)
        .filter((key: string | symbol) => typeof key === 'string' && key.startsWith('apiParameter'))
        .map((key: string) => ({
          key,
          paramMetadata: Reflect.getMetadata(key, model),
        }))
        .sort(
          (
            { key: aKey, paramMetadata: { required: aRequired, in: aIn } },
            { key: bKey, paramMetadata: { required: bRequired, in: bIn } },
          ) => {
            if (aIn !== bIn) {
              const firstKey = [aIn, bIn].sort().shift();
              return firstKey === aKey ? -1 : 1;
            }

            if (aRequired && !bRequired) {
              return -1;
            }

            if (bRequired && !aRequired) {
              return 1;
            }

            return aKey > bKey ? 1 : -1;
          },
        )
        .reduce((acc: MethodDecorator[], { paramMetadata }) => {
          let decorator: (...args: any[]) => MethodDecorator;
          const { in: dest } = paramMetadata;
          switch (dest) {
            case 'header':
              decorator = ApiHeader;
              break;
            case 'path':
              decorator = ApiParam;
              break;
            case 'query':
              decorator = ApiQuery;
              break;
            default:
              // No decorator
              // tslint:disable-next-line: no-console
              console.warn(`ApiParameters: unknown destination in ${dest}`);
              return acc;
          }
          acc.push(decorator(paramMetadata));
          return acc;
        }, dcrtrs),
    [],
  );
  return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    decorators.forEach((d) => d(target, propertyKey, descriptor));
    return descriptor;
  };
};
