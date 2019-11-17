import { validate } from 'class-validator';
import UserCreateDto from './user-create.dto';
import UserUpdateDto from './user-update.dto';

describe('UserCreateDto', () => {
  it('Should not validate missing properties', async () => {
    const user = new UserCreateDto();
    const errors = await validate(user);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isDefined: 'lastname should not be null or undefined',
          isString: 'lastname must be a string',
        },
        property: 'lastname',
        target: user,
        value: undefined,
      },
    ]);
  });

  it('Should not validate invalid lastname', async () => {
    const user = new UserCreateDto();
    Object.assign(user, { lastname: 42 });
    const errors = await validate(user);
    expect(errors).toEqual([
      {
        children: [],
        constraints: { isString: 'lastname must be a string' },
        property: 'lastname',
        target: user,
        value: 42,
      },
    ]);
  });

  it('Should not validate invalid firstname', async () => {
    const user = new UserCreateDto();
    Object.assign(user, { firstname: 42, lastname: 'lastname' });
    const errors = await validate(user);
    expect(errors).toEqual([
      {
        children: [],
        constraints: { isString: 'firstname must be a string' },
        property: 'firstname',
        target: user,
        value: 42,
      },
    ]);
  });
});

describe('UserUpdateDto', () => {
  it('Should not validate missing properties', async () => {
    const user = new UserUpdateDto();
    const errors = await validate(user);
    expect(errors).toEqual([
      {
        children: [],
        constraints: {
          isDefined: 'id should not be null or undefined',
          isString: 'id must be a string',
        },
        property: 'id',
        target: user,
        value: undefined,
      },
      {
        children: [],
        constraints: {
          isDefined: 'lastname should not be null or undefined',
          isString: 'lastname must be a string',
        },
        property: 'lastname',
        target: user,
        value: undefined,
      },
    ]);
  });

  it('Should not validate invalid id', async () => {
    const user = new UserUpdateDto();
    Object.assign(user, { id: 42, lastname: 'lastname' });
    const errors = await validate(user);
    expect(errors).toEqual([
      {
        children: [],
        constraints: { isString: 'id must be a string' },
        property: 'id',
        target: user,
        value: 42,
      },
    ]);
  });

  it('Should not validate invalid lastname', async () => {
    const user = new UserUpdateDto();
    Object.assign(user, { id: 'id', lastname: 42 });
    const errors = await validate(user);
    expect(errors).toEqual([
      {
        children: [],
        constraints: { isString: 'lastname must be a string' },
        property: 'lastname',
        target: user,
        value: 42,
      },
    ]);
  });

  it('Should not validate invalid firstname', async () => {
    const user = new UserUpdateDto();
    Object.assign(user, { id: 'id', firstname: 42, lastname: 'lastname' });
    const errors = await validate(user);
    expect(errors).toEqual([
      {
        children: [],
        constraints: { isString: 'firstname must be a string' },
        property: 'firstname',
        target: user,
        value: 42,
      },
    ]);
  });
});
