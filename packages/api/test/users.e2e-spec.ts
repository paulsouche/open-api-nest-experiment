// tslint:disable: no-implicit-dependencies
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import AppModule from '../src/app.module';
import UserCreateDto from '../src/models/users/user-create.dto';
import userId from '../src/models/users/user-id';
import UserUpdateDto from '../src/models/users/user-update.dto';

describe(`UsersController (e2e)`, () => {
  let app: INestApplication;
  let createdUserId: userId = '' as any;
  const createUser: UserCreateDto = {
    lastname: 'foo',
  };
  const updateUser: UserUpdateDto = {
    id: createdUserId,
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

  describe(`/users (GET)`, () => {
    it(``, () => {
      return request(app.getHttpServer())
        .get(`/users`)
        .expect(200)
        .expect([]);
    });
  });

  describe(`/users (POST)`, () => {
    it(`When invalid Dto`, () => {
      return request(app.getHttpServer())
        .post(`/users`)
        .send({})
        .expect(400);
    });

    it(`When invalid lastname`, () => {
      return request(app.getHttpServer())
        .post(`/users`)
        .send({
          lastname: 42,
        })
        .expect(400);
    });

    it(`When invalid firstname`, () => {
      return request(app.getHttpServer())
        .post(`/users`)
        .send({
          ...createUser,
          firstname: 42,
        })
        .expect(400);
    });

    it(`When valid Dto`, () => {
      return request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual({
            id: body.id,
            ...createUser,
          });
        });
    });
  });

  describe(`/users/{id} (GET)`, () => {
    it(`When id does not exist`, () => {
      return request(app.getHttpServer())
        .get(`/users/404`)
        .expect(404);
    });

    describe(`When id does exist`, () => {
      beforeEach(() => request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .then(({ body }) => createdUserId = body.id));

      afterEach(() => request(app.getHttpServer())
        .delete(`/users/${createdUserId.toString()}`));

      it(``, () => {
        return request(app.getHttpServer())
          .get(`/users/${createdUserId.toString()}`)
          .expect(200)
          .expect({
            ...createUser,
            id: createdUserId,
          });
      });
    });
  });

  describe(`/users/{id} (PUT)`, () => {
    it(`When id does not exist`, () => {
      return request(app.getHttpServer())
        .put(`/users/404`)
        .send({
          ...updateUser,
          id: `404`,
        })
        .expect(404);
    });

    describe(`When id does exist`, () => {
      beforeEach(() => request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .then(({ body }) => createdUserId = body.id));

      afterEach(() => request(app.getHttpServer())
        .delete(`/users/${createdUserId.toString()}`));

      it(`And invalid Dto`, () => {
        return request(app.getHttpServer())
          .put(`/users/${createdUserId.toString()}`)
          .send({})
          .expect(400);
      });

      it(`And invalid lastname`, () => {
        updateUser.id = createdUserId;
        return request(app.getHttpServer())
          .put(`/users/${createdUserId.toString()}`)
          .send({
            ...updateUser,
            lastname: 42,
          })
          .expect(400);
      });

      it(`And invalid firstname`, () => {
        updateUser.id = createdUserId;
        return request(app.getHttpServer())
          .put(`/users/${createdUserId.toString()}`)
          .send({
            ...updateUser,
            firstname: 42,
          })
          .expect(400);
      });

      it(`And different id`, () => {
        updateUser.id = createdUserId;
        return request(app.getHttpServer())
          .put(`/users/${createdUserId.toString()}`)
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
          .send(updateUser)
          .expect(200)
          .expect(updateUser);
      });
    });
  });

  describe(`/users/{id} (DELETE)`, () => {
    it(`When id does not exist`, () => {
      return request(app.getHttpServer())
        .delete(`/users/404`)
        .expect(404);
    });

    describe(`When id does exist`, () => {
      beforeEach(() => request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .then(({ body }) => createdUserId = body.id));

      afterEach(() => request(app.getHttpServer())
        .delete(`/users/${createdUserId.toString()}`));

      it(``, () => {
        return request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}`)
          .expect(200)
          .expect(({ body }) => {
            expect(body).toEqual({
              ...createUser,
              id: createdUserId,
            });
          });
      });
    });
  });
});
