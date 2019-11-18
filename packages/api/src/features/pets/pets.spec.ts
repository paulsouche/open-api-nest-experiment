// tslint:disable: no-implicit-dependencies
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import UserCreateDto from '../users/models/user-create.dto';
import UserDetailedDto from '../users/models/user-detailed.dto';
import userId from '../users/models/user-id';
import PetCreateDto from './models/pet-create.dto';
import petId from './models/pet-id';
import PetUpdateDto from './models/pet-update.dto';
import PetsModule from './pets.module';

describe(`PetsController (e2e)`, () => {
  let jwt: string;
  let app: INestApplication;
  let createdUser: UserDetailedDto;
  let createdUserId: userId = '' as any;
  let createdPetId: petId = '' as any;
  const credentials = {
    login: 'admin',
    password: 'admin',
  };
  const createUser: UserCreateDto = {
    lastname: 'foo',
  };
  const createPet: PetCreateDto = {
    kind: 'Cat',
    nickname: 'bar',
    userId: createdUserId,
  };
  const updatePet: PetUpdateDto = {
    id: createdPetId,
    kind: 'Dog',
    nickname: 'bar',
    userId: createdUserId,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PetsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe(`/users/{userId}/pets (GET)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .get(`/users/404/pets`)
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

      describe(`And {userId} does not exist`, () => {
        it(``, () => {
          return request(app.getHttpServer())
            .get(`/users/404/pets`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(404);
        });
      });

      describe(`And {userId} does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users`)
          .send(createUser)
          .expect(201)
          .set(`Authorization`, `Bearer ${jwt}`)
          .then(({ body }) => createdUserId = body.id));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(200));

        it(``, () => {
          return request(app.getHttpServer())
            .get(`/users/${createdUserId.toString()}/pets`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(200)
            .expect([]);
        });
      });
    });
  });

  describe(`/users/{userId}/pets (POST)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .post(`/users/404/pets`)
          .send(createPet)
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

      describe(`And {userId} does not exist`, () => {
        it(``, () => {
          return request(app.getHttpServer())
            .post(`/users/404/pets`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send(createPet)
            .expect(404);
        });
      });

      describe(`And {userId} does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send(createUser)
          .then(({ body }) => {
            createdUser = body;
            createdUserId = createdUser.id;
            delete createdUser.pets;
          }));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(200));

        it(`And invalid Dto`, () => {
          return request(app.getHttpServer())
            .post(`/users/${createdUserId.toString()}/pets`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send({})
            .expect(400);
        });

        it(`And valid Dto`, () => {
          createPet.userId = createdUserId;
          return request(app.getHttpServer())
            .post(`/users/${createdUserId.toString()}/pets`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send(createPet)
            .expect(201)
            .expect(({ body }) => {
              expect(body).toEqual({
                ...createPet,
                id: body.id,
                user: createdUser,
              });
            });
        });
      });
    });
  });

  describe(`/users/{userId}/pets/{id} (GET)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .get(`/users/404/pets/404`)
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

      describe(`And {userId} does not exist`, () => {
        it(``, () => {
          return request(app.getHttpServer())
            .get(`/users/404/pets/404`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(404);
        });
      });

      describe(`And {userId} does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send(createUser)
          .expect(201)
          .then(({ body }) => {
            createdUser = body;
            createdUserId = createdUser.id;
            delete createdUser.pets;
          }));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(200));

        it(`And id does not exist`, () => {
          return request(app.getHttpServer())
            .get(`/users/${createdUserId.toString()}/pets/404`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(404);
        });

        describe(`And id does exist`, () => {
          beforeEach(() => request(app.getHttpServer())
            .post(`/users/${createdUserId.toString()}/pets`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send({
              ...createPet,
              userId: createdUserId,
            })
            .expect(201)
            .then(({ body }) => createdPetId = body.id));

          afterEach(() => request(app.getHttpServer())
            .delete(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(200));

          it(``, () => {
            return request(app.getHttpServer())
              .get(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
              .set(`Authorization`, `Bearer ${jwt}`)
              .expect(200)
              .expect({
                ...createPet,
                id: createdPetId,
                user: createdUser,
                userId: createdUserId,
              });
          });
        });
      });
    });
  });

  describe(`/users/{userId}/pets/{id} (PUT)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .put(`/users/404/pets/404`)
          .send(updatePet)
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

      describe(`And {userId} does not exist`, () => {
        it(``, () => {
          return request(app.getHttpServer())
            .put(`/users/404/pets/404`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send(updatePet)
            .expect(404);
        });
      });

      describe(`And {userId} does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send(createUser)
          .expect(201)
          .then(({ body }) => {
            createdUser = body;
            createdUserId = createdUser.id;
            delete createdUser.pets;
          }));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(200));

        it(`And id does not exist`, () => {
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}/pets/404`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send({
              ...updatePet,
              id: `404`,
              userId: createdUserId,
            })
            .expect(404);
        });

        describe(`And id does exist`, () => {
          beforeEach(() => request(app.getHttpServer())
            .post(`/users/${createdUserId.toString()}/pets`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send({
              ...createPet,
              userId: createdUserId,
            })
            .expect(201)
            .then(({ body }) => createdPetId = body.id));

          afterEach(() => request(app.getHttpServer())
            .delete(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(200));

          it(`And invalid Dto`, () => {
            return request(app.getHttpServer())
              .put(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
              .set(`Authorization`, `Bearer ${jwt}`)
              .send({})
              .expect(400);
          });

          it(`And different id`, () => {
            updatePet.userId = createdUserId;
            return request(app.getHttpServer())
              .put(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
              .set(`Authorization`, `Bearer ${jwt}`)
              .send({
                ...updatePet,
                id: `quux`,
              })
              .expect(400);
          });

          it(`And valid Dto`, () => {
            updatePet.id = createdPetId;
            updatePet.userId = createdUserId;
            return request(app.getHttpServer())
              .put(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
              .set(`Authorization`, `Bearer ${jwt}`)
              .send(updatePet)
              .expect(200)
              .expect({
                ...updatePet,
                user: createdUser,
              });
          });
        });
      });
    });
  });

  describe(`/users/{userId}/pets/{id} (DELETE)`, () => {
    describe(`When not logged in`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .delete(`/users/404/pets/404`)
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

      describe(`And {userId} does not exist`, () => {
        it(``, () => {
          return request(app.getHttpServer())
            .delete(`/users/404/pets/404`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(404);
        });
      });

      describe(`And {userId} does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .send(createUser)
          .expect(201)
          .then(({ body }) => {
            createdUser = body;
            createdUserId = createdUser.id;
            delete createdUser.pets;
          }));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}`)
          .set(`Authorization`, `Bearer ${jwt}`)
          .expect(200));

        it(`And id does not exist`, () => {
          return request(app.getHttpServer())
            .delete(`/users/${createdUserId.toString()}/pets/404`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .expect(404);
        });

        describe(`And id does exist`, () => {
          beforeEach(() => request(app.getHttpServer())
            .post(`/users/${createdUserId.toString()}/pets`)
            .set(`Authorization`, `Bearer ${jwt}`)
            .send({
              ...createPet,
              userId: createdUserId,
            })
            .expect(201)
            .then(({ body }) => createdPetId = body.id));

          it(``, () => {
            return request(app.getHttpServer())
              .delete(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
              .set(`Authorization`, `Bearer ${jwt}`)
              .expect(200)
              .expect({
                ...createPet,
                id: createdPetId,
                user: createdUser,
                userId: createdUserId,
              });
          });
        });
      });
    });
  });
});
