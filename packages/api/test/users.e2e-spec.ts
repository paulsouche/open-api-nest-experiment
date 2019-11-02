// tslint:disable: no-implicit-dependencies
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import AppModule from '../src/app.module';
import UserCreateDto from '../src/models/user-create-dto';
import UserUpdateDto from '../src/models/user-update-dto';

describe(`UsersController (e2e)`, () => {
  let app: INestApplication;
  let createdId: string = '';
  const createUser: UserCreateDto = {
    lastname: 'foo',
  };
  const updateUser: UserUpdateDto = {
    id: createdId,
    lastname: 'foo',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/users (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/users`)
      .expect(200)
      .expect([]);
  });

  it(`/users (POST)`, () => {
    return request(app.getHttpServer())
      .post(`/users`)
      .send({})
      .expect(400);
  });

  it(`/users (POST)`, () => {
    return request(app.getHttpServer())
      .post(`/users`)
      .send({
        lastname: 42,
      })
      .expect(400);
  });

  it(`/users (POST)`, () => {
    return request(app.getHttpServer())
      .post(`/users`)
      .send({
        ...createUser,
        firstname: 42,
      })
      .expect(400);
  });

  it(`/users (POST)`, () => {
    return request(app.getHttpServer())
      .post(`/users`)
      .send(createUser)
      .expect(201)
      .expect(({ body }) => {
        createdId = body.id;
        expect(body).toEqual({
          id: createdId,
          ...createUser,
        });
      });
  });

  it(`/users/{id} (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/users/404`)
      .expect(404);
  });

  it(`/users/{id} (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/users/${createdId}`)
      .expect(200)
      .expect({
        id: createdId,
        ...createUser,
      });
  });

  it(`/users/{id} (PUT)`, () => {
    updateUser.id = createdId;
    return request(app.getHttpServer())
      .put(`/users/${createdId}`)
      .send({})
      .expect(400);
  });

  it(`/users/{id} (PUT)`, () => {
    updateUser.id = createdId;
    return request(app.getHttpServer())
      .put(`/users/${createdId}`)
      .send({
        ...updateUser,
        lastname: 42,
      })
      .expect(400);
  });

  it(`/users/{id} (PUT)`, () => {
    updateUser.id = createdId;
    return request(app.getHttpServer())
      .put(`/users/${createdId}`)
      .send({
        ...updateUser,
        firstname: 42,
      })
      .expect(400);
  });

  it(`/users/{id} (PUT)`, () => {
    updateUser.id = createdId;
    return request(app.getHttpServer())
      .put(`/users/${createdId}`)
      .send({
        ...updateUser,
        id: 'quux',
      })
      .expect(400);
  });

  it(`/users/{id} (PUT)`, () => {
    updateUser.id = createdId;
    return request(app.getHttpServer())
      .put(`/users/${createdId}`)
      .send(updateUser)
      .expect(200)
      .expect(updateUser);
  });

  it(`/users/{id} (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/users/404`)
      .expect(404);
  });

  it(`/users/{id} (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/users/${createdId}`)
      .expect(200)
      .expect(updateUser);
  });
});
