// tslint:disable: no-implicit-dependencies
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import UserCreateDto from './models/user-create.dto';
import userId from './models/user-id';
import UserUpdateDto from './models/user-update.dto';
import UsersModule from './users.module';

describe(`UsersController (e2e)`, () => {
  const credentials = {
    login: 'admin',
    password: 'admin',
  };
  let app: INestApplication;
  let createdUserId: userId = '' as any;
  let jwt: string;
  const createUser: UserCreateDto = {
    lastname: 'foo',
  };
  const updateUser: UserUpdateDto = {
    id: createdUserId,
    lastname: 'foo',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe(`/users (GET)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .get(`/users`)
          .expect(401);
      });
    });

    describe(`When logged in`, () => {
      beforeEach(() => {
        return request(app.getHttpServer())
          .post(`/login`)
          .send(credentials)
          .expect(201)
          .then(({ body }) => jwt = body.jwt);
      });

      it(``, () => {
        return request(app.getHttpServer())
          .get(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(200)
          .expect([]);
      });
    });
  });

  describe(`/users (POST)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .post(`/users`)
          .send(createUser)
          .expect(401);
      });
    });

    describe(`When logged in`, () => {
      beforeEach(() => {
        return request(app.getHttpServer())
          .post(`/login`)
          .send(credentials)
          .expect(201)
          .then(({ body }) => jwt = body.jwt);
      });

      it(`And invalid Dto`, () => {
        return request(app.getHttpServer())
          .post(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send({})
          .expect(400);
      });

      it(`And valid Dto`, () => {
        return request(app.getHttpServer())
          .post(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send(createUser)
          .expect(201)
          .expect(({ body }) => {
            expect(body).toEqual({
              id: body.id,
              ...createUser,
              pets: [],
            });
          });
      });
    });
  });

  describe(`/users/{id} (GET)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .get(`/users/404`)
          .expect(401);
      });
    });

    describe(`When logged in`, () => {
      beforeEach(() => {
        return request(app.getHttpServer())
          .post(`/login`)
          .send(credentials)
          .expect(201)
          .then(({ body }) => jwt = body.jwt);
      });

      it(`And id does not exist`, () => {
        return request(app.getHttpServer())
          .get(`/users/404`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(404);
      });

      describe(`And id does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send(createUser)
          .expect(201)
          .then(({ body }) => createdUserId = body.id));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(200));

        it(``, () => {
          return request(app.getHttpServer())
            .get(`/users/${createdUserId.toString()}`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(200)
            .expect({
              ...createUser,
              id: createdUserId,
              pets: [],
            });
        });
      });
    });
  });

  describe(`/users/{id} (PUT)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .put(`/users/404`)
          .send({
            ...updateUser,
            id: `404`,
          })
          .expect(401);
      });
    });

    describe(`When logged in`, () => {
      beforeEach(() => {
        return request(app.getHttpServer())
          .post(`/login`)
          .send(credentials)
          .expect(201)
          .then(({ body }) => jwt = body.jwt);
      });

      it(`And id does not exist`, () => {
        return request(app.getHttpServer())
          .put(`/users/404`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send({
            ...updateUser,
            id: `404`,
          })
          .expect(404);
      });

      describe(`And id does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send(createUser)
          .expect(201)
          .then(({ body }) => createdUserId = body.id));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(200));

        it(`And invalid Dto`, () => {
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send({})
            .expect(400);
        });

        it(`And different id`, () => {
          updateUser.id = createdUserId;
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send({
              ...updateUser,
              id: `quux`,
            })
            .expect(400);
        });

        it(`And valid Dto`, () => {
          updateUser.id = createdUserId;
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send(updateUser)
            .expect(200)
            .expect({
              ...updateUser,
              pets: [],
            });
        });
      });
    });
  });

  describe(`/users/{id} (DELETE)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .delete(`/users/404`)
          .expect(401);
      });
    });

    describe(`When logged in`, () => {
      beforeEach(() => {
        return request(app.getHttpServer())
          .post(`/login`)
          .send(credentials)
          .expect(201)
          .then(({ body }) => jwt = body.jwt);
      });

      it(`And id does not exist`, () => {
        return request(app.getHttpServer())
          .delete(`/users/404`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(404);
      });

      describe(`And id does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send(createUser)
          .expect(201)
          .then(({ body }) => createdUserId = body.id));

        it(``, () => {
          return request(app.getHttpServer())
            .delete(`/users/${createdUserId.toString()}`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(200)
            .expect(({ body }) => {
              expect(body).toEqual({
                ...createUser,
                id: createdUserId,
                pets: [],
              });
            });
        });
      });
    });
  });
});
