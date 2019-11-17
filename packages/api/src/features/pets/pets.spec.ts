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
  let app: INestApplication;
  let createdUser: UserDetailedDto;
  let createdUserId: userId = '' as any;
  let createdPetId: petId = '' as any;
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
    describe(`When {userId} does not exist`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .get(`/users/404/pets`)
          .expect(404);
      });
    });

    describe(`When {userId} does exist`, () => {
      beforeEach(() => request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .then(({ body }) => createdUserId = body.id));

      afterEach(() => request(app.getHttpServer())
        .delete(`/users/${createdUserId.toString()}`));

      it(``, () => {
        return request(app.getHttpServer())
          .get(`/users/${createdUserId.toString()}/pets`)
          .expect(200)
          .expect([]);
      });
    });
  });

  describe(`/users/{userId}/pets (POST)`, () => {
    describe(`When {userId} does not exist`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .post(`/users/404/pets`)
          .send(createPet)
          .expect(404);
      });
    });

    describe(`When {userId} does exist`, () => {
      beforeEach(() => request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .then(({ body }) => {
          createdUser = body;
          createdUserId = createdUser.id;
          delete createdUser.pets;
        }));

      afterEach(() => request(app.getHttpServer())
        .delete(`/users/${createdUserId.toString()}`));

      it(`And invalid Dto`, () => {
        return request(app.getHttpServer())
          .post(`/users/${createdUserId.toString()}/pets`)
          .send({})
          .expect(400);
      });

      it(`And valid Dto`, () => {
        createPet.userId = createdUserId;
        return request(app.getHttpServer())
          .post(`/users/${createdUserId.toString()}/pets`)
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

  describe(`/users/{userId}/pets/{id} (GET)`, () => {
    describe(`When {userId} does not exist`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .get(`/users/404/pets/404`)
          .expect(404);
      });
    });

    describe(`When {userId} does exist`, () => {
      beforeEach(() => request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .then(({ body }) => {
          createdUser = body;
          createdUserId = createdUser.id;
          delete createdUser.pets;
        }));

      afterEach(() => request(app.getHttpServer())
        .delete(`/users/${createdUserId.toString()}`));

      it(`And id does not exist`, () => {
        return request(app.getHttpServer())
          .get(`/users/${createdUserId.toString()}/pets/404`)
          .expect(404);
      });

      describe(`And id does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users/${createdUserId.toString()}/pets`)
          .send({
            ...createPet,
            userId: createdUserId,
          })
          .then(({ body }) => createdPetId = body.id));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`));

        it(``, () => {
          return request(app.getHttpServer())
            .get(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
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

  describe(`/users/{userId}/pets/{id} (PUT)`, () => {
    describe(`When {userId} does not exist`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .put(`/users/404/pets/404`)
          .send(updatePet)
          .expect(404);
      });
    });

    describe(`When {userId} does exist`, () => {
      beforeEach(() => request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .then(({ body }) => {
          createdUser = body;
          createdUserId = createdUser.id;
          delete createdUser.pets;
        }));

      afterEach(() => request(app.getHttpServer())
        .delete(`/users/${createdUserId.toString()}`));

      it(`And id does not exist`, () => {
        return request(app.getHttpServer())
          .put(`/users/${createdUserId.toString()}/pets/404`)
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
          .send({
            ...createPet,
            userId: createdUserId,
          })
          .then(({ body }) => createdPetId = body.id));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`));

        it(`And invalid Dto`, () => {
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
            .send({})
            .expect(400);
        });

        it(`And different id`, () => {
          updatePet.userId = createdUserId;
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
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

  describe(`/users/{userId}/pets/{id} (DELETE)`, () => {
    describe(`When {userId} does not exist`, () => {
      it(``, () => {
        return request(app.getHttpServer())
          .delete(`/users/404/pets/404`)
          .expect(404);
      });
    });

    describe(`When {userId} does exist`, () => {
      beforeEach(() => request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .then(({ body }) => {
          createdUser = body;
          createdUserId = createdUser.id;
          delete createdUser.pets;
        }));

      afterEach(() => request(app.getHttpServer())
        .delete(`/users/${createdUserId.toString()}`));

      it(`And id does not exist`, () => {
        return request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}/pets/404`)
          .expect(404);
      });

      describe(`And id does exist`, () => {
        beforeEach(() => request(app.getHttpServer())
          .post(`/users/${createdUserId.toString()}/pets`)
          .send({
            ...createPet,
            userId: createdUserId,
          })
          .then(({ body }) => createdPetId = body.id));

        afterEach(() => request(app.getHttpServer())
          .delete(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`));

        it(``, () => {
          return request(app.getHttpServer())
            .delete(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
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