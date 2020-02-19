// tslint:disable: no-implicit-dependencies
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import AuthModule from './auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe(`/login (POST)`, () => {
    it(`When invalid dto`, () => {
      return request(app.getHttpServer())
        .post(`/login`)
        .send({})
        .expect(400);
    });

    it(`When invalid login`, () => {
      return request(app.getHttpServer())
        .post(`/login`)
        .send({
          login: '401',
          password: 'admin',
        })
        .expect(401);
    });

    it(`When invalid password`, () => {
      return request(app.getHttpServer())
        .post(`/login`)
        .send({
          login: 'admin',
          password: '401',
        })
        .expect(401);
    });

    it(`When valid credentials`, () => {
      return request(app.getHttpServer())
        .post(`/login`)
        .send({
          login: 'admin',
          password: 'admin',
        })
        .expect(201)
        .expect((res) => {
          const { body: { jwt } } = res;
          const refreshCookie = (res.get('set-cookie') as unknown as string[]).pop();
          expect(typeof refreshCookie).toBe('string');
          const jwtBody: string = jwt.split('.').slice(1).shift().replace(/-/g, '+').replace(/_/g, '/');
          const { exp, sub } = JSON.parse(Buffer.from(jwtBody, 'base64').toString());
          expect(typeof exp).toBe('number');
          expect(typeof sub).toBe('string');
        });
    });
  });
});
