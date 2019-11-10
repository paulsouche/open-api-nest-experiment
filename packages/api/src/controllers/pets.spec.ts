// tslint:disable: no-implicit-dependencies
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import AppModule from '../app.module';
import PetCreateDto from '../models/pets/pet-create.dto';
import petId from '../models/pets/pet-id';
import PetUpdateDto from '../models/pets/pet-update.dto';
import UserCreateDto from '../models/users/user-create.dto';
import userId from '../models/users/user-id';

describe(`PetsController (e2e)`, () => {
  let app: INestApplication;
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
      imports: [AppModule],
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
        .then(({ body }) => createdUserId = body.id));

      afterEach(() => request(app.getHttpServer())
        .delete(`/users/${createdUserId.toString()}`));

      it(`And invalid Dto`, () => {
        return request(app.getHttpServer())
          .post(`/users/${createdUserId.toString()}/pets`)
          .send({})
          .expect(400);
      });

      it(`And invalid nickname`, () => {
        createPet.userId = createdUserId;
        return request(app.getHttpServer())
          .post(`/users/${createdUserId.toString()}/pets`)
          .send({
            ...createPet,
            nickname: 42,
          })
          .expect(400);
      });

      it(`And invalid kind`, () => {
        createPet.userId = createdUserId;
        return request(app.getHttpServer())
          .post(`/users/${createdUserId.toString()}/pets`)
          .send({
            ...createPet,
            kind: `quux`,
          })
          .expect(400);
      });

      it(`And invalid userId`, () => {
        return request(app.getHttpServer())
          .post(`/users/${createdUserId.toString()}/pets`)
          .send(createPet)
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
        .then(({ body }) => createdUserId = body.id));

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
        .then(({ body }) => createdUserId = body.id));

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

        it(`And invalid nickname`, () => {
          updatePet.id = createdPetId;
          updatePet.userId = createdUserId;
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
            .send({
              ...updatePet,
              nickname: 42,
            })
            .expect(400);
        });

        it(`And invalid kind`, () => {
          updatePet.id = createdPetId;
          updatePet.userId = createdUserId;
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
            .send({
              ...updatePet,
              kind: 'quux',
            })
            .expect(400);
        });

        it(`And invalid userId`, () => {
          updatePet.id = createdPetId;
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
            .send(updatePet)
            .expect(400);
        });

        it(`And valid Dto`, () => {
          updatePet.id = createdPetId;
          updatePet.userId = createdUserId;
          return request(app.getHttpServer())
            .put(`/users/${createdUserId.toString()}/pets/${createdPetId.toString()}`)
            .send(updatePet)
            .expect(200)
            .expect(updatePet);
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
        .then(({ body }) => createdUserId = body.id));

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
              userId: createdUserId,
            });
        });
      });
    });
  });
});
