// tslint:disable-next-line: no-implicit-dependencies
import nock from 'nock';
import { AuthApiFp } from '../src/dist';
import { BASE_PATH } from '../src/dist/base';

const LOGIN_PATH = `/login`;

describe(`Feature auth`, () => {
  describe(`${LOGIN_PATH} (POST)`, () => {
    it(`Should return 401 with invalid credentials`, async () => {
      const scope = nock(BASE_PATH)
        .post(LOGIN_PATH)
        .reply(401, {
          error: `Unauthorized`,
          statusCode: 401,
        });

      try {
        await AuthApiFp().login({
          login: `foo`,
          password: `bar`,
        })();
        throw new Error(`Request should fail`);
      } catch ({ response }) {
        expect(response).toBeDefined();
        expect(response.status).toBe(401);
      }

      scope.done();
    });

    it(`Should return 201 with valid credentials`, async () => {
      const scope = nock(BASE_PATH)
        .post(LOGIN_PATH)
        .reply(201, {
          jwt: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MmMzNzdlYS0zYmIwLTRjZTAtODYyZi01ZmQyZjM1M2UwYTIiLCJpYXQiOjE1Nzg4Mzc2MjcsImV4cCI6MTU3ODg0MTIyN30.Vg3lGWvtymqOvifdXyMJNrok9RSSSsj8gdX2iaQKqUo`,
        });

      const response = await AuthApiFp().login({
        login: `admin`,
        password: `admin`,
      })();

      expect(response.status).toBe(201);
      const jwtBody: string = response.data.jwt.split(`.`).slice(1).shift()!.replace(/-/g, `+`).replace(/_/g, `/`);
      const { exp, sub } = JSON.parse(Buffer.from(jwtBody, `base64`).toString());
      expect(typeof exp).toBe(`number`);
      expect(typeof sub).toBe(`string`);

      scope.done();
    });
  });
});
