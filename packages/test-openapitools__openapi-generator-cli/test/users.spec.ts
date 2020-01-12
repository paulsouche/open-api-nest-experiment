// tslint:disable-next-line: no-implicit-dependencies
import nock, { Scope } from 'nock';
import { UsersApiFp } from '../src/dist';
import { BASE_PATH } from '../src/dist/base';

const USERS_PATH = `/users`;
const JWT = `jwt`;

describe(`Feature users`, () => {
  describe(`${USERS_PATH} (GET)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .get(USERS_PATH)
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
        await UsersApiFp().getUsers()();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 200 with bearer`, async () => {
      const response = await UsersApiFp({ accessToken: JWT }).getUsers()();

      expect(response.status).toBe(200);
      expect(response.data).toEqual([]);
    });
  });

  describe(`${USERS_PATH} (POST)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .post(USERS_PATH)
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
        await UsersApiFp().createUser({
          lastname: `lastname`,
        })();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 201 with bearer`, async () => {
      const response = await UsersApiFp({ accessToken: JWT }).createUser({
        lastname: `lastname`,
      })();

      expect(response.status).toBe(201);
      expect(response.data).toEqual({
        id: `id`,
        lastname: `lastname`,
      });
    });
  });

  describe(`${USERS_PATH}/{id} (GET)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .get(`${USERS_PATH}/id`)
      .reply(function() {
        return (this.req.getHeader(`Authorization`) === `Bearer ${JWT}`)
          ? [200, {
            firstname: `firstname`,
            id: `id`,
            lastname: `lastname`,
          }]
          : [401, {
            error: `Unauthorized`,
            statusCode: 401,
          }];
      }));

    afterEach(() => scope.done());

    it(`Should return 401 with no bearer`, async () => {
      try {
        await UsersApiFp().getUser(`id`)();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 200 with bearer`, async () => {
      const response = await UsersApiFp({ accessToken: JWT }).getUser(`id`)();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        firstname: `firstname`,
        id: `id`,
        lastname: `lastname`,
      });
    });
  });

  describe(`${USERS_PATH}/id (PUT)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .put(`${USERS_PATH}/id`)
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
        await UsersApiFp().updateUser(`id`, {
          id: `id`,
          lastname: `lastname updated`,
        })();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 200 with bearer`, async () => {
      const response = await UsersApiFp({ accessToken: JWT }).updateUser(`id`, {
        id: `id`,
        lastname: `lastname updated`,
      })();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: `id`,
        lastname: `lastname updated`,
      });
    });
  });

  describe(`${USERS_PATH}/id (DELETE)`, () => {
    let scope: Scope;

    beforeEach(() => scope = nock(BASE_PATH)
      .delete(`${USERS_PATH}/id`)
      .reply(function() {
        return (this.req.getHeader(`Authorization`) === `Bearer ${JWT}`)
          ? [200, {
            id: `id`,
            lastname: `lastname`,
          }]
          : [401, {
            error: `Unauthorized`,
            statusCode: 401,
          }];
      }));

    afterEach(() => scope.done());

    it(`Should return 401 with no bearer`, async () => {
      try {
        await UsersApiFp().deleteUser(`id`)();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }
    });

    it(`Should return 200 with bearer`, async () => {
      const response = await UsersApiFp({ accessToken: JWT }).deleteUser(`id`)();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: `id`,
        lastname: `lastname`,
      });
    });
  });
});
