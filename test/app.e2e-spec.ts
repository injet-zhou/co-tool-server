import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({ code: 200, msg: 'succeed', data: 'Hello World!' });
  });
});

describe('toos controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tools/translate (POST', () => {
    return request(app.getHttpServer())
      .post('/tools/translate')
      .send({
        text: 'hello world',
        from: 'en',
        to: 'zh',
      })
      .expect(200)
      .expect({
        code: 200,
        msg: 'succeed',
        data: ['你好，世界'],
      });
  });
});
