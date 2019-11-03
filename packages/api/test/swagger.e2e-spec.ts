// tslint:disable: no-implicit-dependencies
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import OpenAPISchemaValidator from 'openapi-schema-validator';
import request from 'supertest';
import AppModule from '../src/app.module';
import setupSwagger from '../src/swagger';

describe('Swagger (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupSwagger(app);
    await app.init();
  });

  it('/swagger-json (GET)', () => {
    return request(app.getHttpServer())
      .get('/swagger-json')
      .expect(200)
      .expect(({ body }) => {
        const validator = new OpenAPISchemaValidator({
          version: '3.0',
        });
        expect(validator.validate(body)).toEqual({ errors: [] });
      });
  });
});
