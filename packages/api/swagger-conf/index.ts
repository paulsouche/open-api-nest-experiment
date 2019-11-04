// tslint:disable: no-implicit-dependencies
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import AppModule from '../src/app.module';
import setupSwagger from '../src/swagger';

async function getApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  setupSwagger(app);
  return app.init();
}

export default async function getSwaggerConf<T = any>(): Promise<T> {
  const agent = request((await getApp()).getHttpServer());
  const res = await agent.get('/swagger-json');
  return res.body;
}
