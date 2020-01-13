import { validate } from 'class-validator';
import PetCreateDto from './pet-create.dto';
import PetUpdateDto from './pet-update.dto';

describe('PetCreateDto', () => {
  it('Should not validate missing properties', async () => {
    const pet = new PetCreateDto();
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isDefined: 'kind should not be null or undefined',
          isIn: 'kind must be one of the following values: Cat,Dog,Hamster,Rabbit',
        },
        property: 'kind',
        target: pet,
        value: undefined,
      },
      {
        children: [],
        constraints: {
          isDefined: 'userId should not be null or undefined',
          isString: 'userId must be a string',
        },
        property: 'userId',
        target: pet,
        value: undefined,
      },
      {
        children: [],
        constraints: {
          isDefined: 'nickname should not be null or undefined',
          isString: 'nickname must be a string',
        },
        property: 'nickname',
        target: pet,
        value: undefined,
      },
    ]);
  });

  it('Should not validate invalid userId', async () => {
    const pet = new PetCreateDto();
    Object.assign(pet, { userId: 42, nickname: 'nickname', kind: 'Cat' });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isString: 'userId must be a string',
        },
        property: 'userId',
        target: pet,
        value: 42,
      },
    ]);
  });

  it('Should not validate invalid nickname', async () => {
    const pet = new PetCreateDto();
    Object.assign(pet, { userId: 'userId', nickname: 42, kind: 'Cat' });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isString: 'nickname must be a string',
        },
        property: 'nickname',
        target: pet,
        value: 42,
      },
    ]);
  });

  it('Should not validate invalid nickname', async () => {
    const pet = new PetCreateDto();
    Object.assign(pet, { userId: 'userId', nickname: 'nickname', kind: 'Kind' });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isIn: 'kind must be one of the following values: Cat,Dog,Hamster,Rabbit',
        },
        property: 'kind',
        target: pet,
        value: 'Kind',
      },
    ]);
  });

  it('Should not validate invalid metadatas', async () => {
    const pet = new PetCreateDto();
    Object.assign(pet, { userId: 'userId', nickname: 'nickname', kind: 'Cat', metas: 42 });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isPetMeta: 'Metas should match the kind of pet',
        },
        property: 'metas',
        target: pet,
        value: 42,
      },
    ]);
  });

  it('Should not validate non matching metadatas', async () => {
    const pet = new PetCreateDto();
    const metas = {
      trainings: ['blinds'],
    };

    Object.assign(pet, {
      kind: 'Cat',
      metas,
      nickname: 'nickname',
      userId: 'userId',
    });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isPetMeta: 'Metas should match the kind of pet',
        },
        property: 'metas',
        target: pet,
        value: metas,
      },
    ]);
  });
});

describe('PetUpdateDto', () => {
  it('Should not validate missing properties', async () => {
    const pet = new PetUpdateDto();
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isDefined: 'kind should not be null or undefined',
          isIn: 'kind must be one of the following values: Cat,Dog,Hamster,Rabbit',
        },
        property: 'kind',
        target: pet,
        value: undefined,
      },
      {
        children: [],
        constraints: {
          isDefined: 'id should not be null or undefined',
          isString: 'id must be a string',
        },
        property: 'id',
        target: pet,
        value: undefined,
      },
      {
        children: [],
        constraints: {
          isDefined: 'userId should not be null or undefined',
          isString: 'userId must be a string',
        },
        property: 'userId',
        target: pet,
        value: undefined,
      },
      {
        children: [],
        constraints: {
          isDefined: 'nickname should not be null or undefined',
          isString: 'nickname must be a string',
        },
        property: 'nickname',
        target: pet,
        value: undefined,
      },
    ]);
  });

  it('Should not validate invalid id', async () => {
    const pet = new PetUpdateDto();
    Object.assign(pet, { id: 42, userId: 'userId', nickname: 'nickname', kind: 'Cat' });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isString: 'id must be a string',
        },
        property: 'id',
        target: pet,
        value: 42,
      },
    ]);
  });

  it('Should not validate invalid userId', async () => {
    const pet = new PetUpdateDto();
    Object.assign(pet, { id: 'id', userId: 42, nickname: 'nickname', kind: 'Cat' });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isString: 'userId must be a string',
        },
        property: 'userId',
        target: pet,
        value: 42,
      },
    ]);
  });

  it('Should not validate invalid nickname', async () => {
    const pet = new PetUpdateDto();
    Object.assign(pet, { id: 'id', userId: 'userId', nickname: 42, kind: 'Cat' });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isString: 'nickname must be a string',
        },
        property: 'nickname',
        target: pet,
        value: 42,
      },
    ]);
  });

  it('Should not validate invalid nickname', async () => {
    const pet = new PetUpdateDto();
    Object.assign(pet, { id: 'id', userId: 'userId', nickname: 'nickname', kind: 'Kind' });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isIn: 'kind must be one of the following values: Cat,Dog,Hamster,Rabbit',
        },
        property: 'kind',
        target: pet,
        value: 'Kind',
      },
    ]);
  });

  it('Should not validate invalid metadatas', async () => {
    const pet = new PetUpdateDto();
    Object.assign(pet, { id: 'id', userId: 'userId', nickname: 'nickname', kind: 'Cat', metas: 42 });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isPetMeta: 'Metas should match the kind of pet',
        },
        property: 'metas',
        target: pet,
        value: 42,
      },
    ]);
  });

  it('Should not validate non matching metadatas', async () => {
    const pet = new PetUpdateDto();
    const metas = {
      trainings: ['blinds'],
    };

    Object.assign(pet, {
      id: 'id',
      kind: 'Cat',
      metas,
      nickname: 'nickname',
      userId: 'userId',
    });
    const errors = await validate(pet);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isPetMeta: 'Metas should match the kind of pet',
        },
        property: 'metas',
        target: pet,
        value: metas,
      },
    ]);
  });
});
