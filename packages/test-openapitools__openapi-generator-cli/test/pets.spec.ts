// tslint:disable-next-line: no-implicit-dependencies
import nock, { Scope } from 'nock';
import { CatCreateDtoKindEnum, CatUpdateDtoKindEnum, PetDetailedDtoKindEnum, PetsApiFp } from '../src/dist';
import { BASE_PATH } from '../src/dist/base';

const USER_ID = `userId`;
const PETS_PATH = `/users/${USER_ID}/pets`;
const JWT = `jwt`;

describe(`Feature pets`, () => {
  describe(`${PETS_PATH} (GET)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .get(PETS_PATH)
      .reply(function() {
        return (this.req.getHeader(`Authorization`) === `Bearer ${JWT}`)
          ? [200, []]
          : [401, {
            error: `Unauthorized`,
            statusCode: 401,
          }];
      }));

    afterEach(() => scope.done());

    it(`Should return 401 with no bearer`, async () => {
      try {
        await PetsApiFp().getPets(USER_ID)();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 200 with bearer`, async () => {
      const response = await PetsApiFp({ accessToken: JWT }).getPets(USER_ID)();

      expect(response.status).toBe(200);
      expect(response.data).toEqual([]);
    });
  });

  describe(`${PETS_PATH} (POST)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .post(PETS_PATH)
      .reply(function(_, requestBody) {
        return (this.req.getHeader(`Authorization`) === `Bearer ${JWT}`)
          ? [201, {
            ...requestBody as object,
            id: `id`,
          }]
          : [401, {
            error: `Unauthorized`,
            statusCode: 401,
          }];
      }));

    afterEach(() => scope.done());

    it(`Should return 401 with no bearer`, async () => {
      try {
        await PetsApiFp().createPet(USER_ID, {
          kind: CatCreateDtoKindEnum.Cat,
          nickname: `nickname`,
          userId: USER_ID,
        })();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 201 with bearer`, async () => {
      const response = await PetsApiFp({ accessToken: JWT }).createPet(USER_ID, {
        kind: CatCreateDtoKindEnum.Cat,
        nickname: `nickname`,
        userId: USER_ID,
      })();

      expect(response.status).toBe(201);
      expect(response.data).toEqual({
        id: `id`,
        kind: CatCreateDtoKindEnum.Cat,
        nickname: `nickname`,
        userId: USER_ID,
      });
    });
  });

  describe(`${PETS_PATH}/{id} (GET)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .get(`${PETS_PATH}/id`)
      .reply(function() {
        return (this.req.getHeader(`Authorization`) === `Bearer ${JWT}`)
          ? [200, {
            id: `id`,
            kind: CatCreateDtoKindEnum.Cat,
            nickname: `nickname`,
            userId: USER_ID,
          }]
          : [401, {
            error: `Unauthorized`,
            statusCode: 401,
          }];
      }));

    afterEach(() => scope.done());

    it(`Should return 401 with no bearer`, async () => {
      try {
        await PetsApiFp().getPet(USER_ID, `id`)();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 200 with bearer`, async () => {
      const response = await PetsApiFp({ accessToken: JWT }).getPet(USER_ID, `id`)();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: `id`,
        kind: CatCreateDtoKindEnum.Cat,
        nickname: `nickname`,
        userId: USER_ID,
      });
    });
  });

  describe(`${PETS_PATH}/id (PUT)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .put(`${PETS_PATH}/id`)
      .reply(function(_, requestBody) {
        return (this.req.getHeader(`Authorization`) === `Bearer ${JWT}`)
          ? [200, {
            ...requestBody as object,
            id: `id`,
          }]
          : [401, {
            error: `Unauthorized`,
            statusCode: 401,
          }];
      }));

    afterEach(() => scope.done());

    it(`Should return 401 with no bearer`, async () => {
      try {
        await PetsApiFp().updatePet(USER_ID, `id`, {
          id: `id`,
          kind: CatUpdateDtoKindEnum.Cat,
          nickname: `lastname updated`,
          userId: USER_ID,
        })();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 200 with bearer`, async () => {
      const response = await PetsApiFp({ accessToken: JWT }).updatePet(USER_ID, `id`, {
        id: `id`,
        kind: CatUpdateDtoKindEnum.Cat,
        nickname: `lastname updated`,
        userId: USER_ID,
      })();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: `id`,
        kind: CatUpdateDtoKindEnum.Cat,
        nickname: `lastname updated`,
        userId: USER_ID,
      });
    });
  });

  describe(`${PETS_PATH}/id (DELETE)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .delete(`${PETS_PATH}/id`)
      .reply(function() {
        return (this.req.getHeader(`Authorization`) === `Bearer ${JWT}`)
          ? [200, {
            id: `id`,
            kind: PetDetailedDtoKindEnum.Cat,
            nickname: `nickname`,
            userId: USER_ID,
          }]
          : [401, {
            error: `Unauthorized`,
            statusCode: 401,
          }];
      }));

    afterEach(() => scope.done());

    it(`Should return 401 with no bearer`, async () => {
      try {
        await PetsApiFp().deletePet(USER_ID, `id`)();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 200 with bearer`, async () => {
      const response = await PetsApiFp({ accessToken: JWT }).deletePet(USER_ID, `id`)();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: `id`,
        kind: PetDetailedDtoKindEnum.Cat,
        nickname: `nickname`,
        userId: USER_ID,
      });
    });
  });
});
