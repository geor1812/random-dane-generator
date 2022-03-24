import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cpr returns status 200 and a a cpr', () => {
    return request(app.getHttpServer())
      .get('/cpr')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('cpr');
      });
  });

  it('/name-gender returns status 200 and a name + gender', () => {
    return request(app.getHttpServer())
      .get('/name-gender')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('gender');
      });
  });

  it('/name-gender-birthday returns status 200 and name + gender + birthday', () => {
    return request(app.getHttpServer())
      .get('/name-gender-birthday')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('gender');
        expect(response.body).toHaveProperty('birthday');
      });
  });

  it('/cpr-name-gender returns status 200 and cpr + name + gender', () => {
    return request(app.getHttpServer())
      .get('/cpr-name-gender')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('cpr');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('gender');
      });
  });

  it('/cpr-name-gender-birthday returns status 200 and cpr + name + gender + birthday', () => {
    return request(app.getHttpServer())
      .get('/cpr-name-gender-birthday')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('cpr');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('gender');
        expect(response.body).toHaveProperty('birthday');
      });
  });

  it('/address returns status 200 and a address', () => {
    return request(app.getHttpServer())
      .get('/address')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('address');
        expect(response.body.address).toHaveProperty('street');
        expect(response.body.address).toHaveProperty('floor');
        expect(response.body.address).toHaveProperty('door');
        expect(response.body.address).toHaveProperty('postalCode');
        expect(response.body.address.postalCode).toHaveProperty('code');
        expect(response.body.address.postalCode).toHaveProperty('town');
      });
  });

  it('/phone returns status 200 and a phone', () => {
    return request(app.getHttpServer())
      .get('/phone')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('phone');
      });
  });

  it('/person returns status 200 and a whole person', () => {
    return request(app.getHttpServer())
      .get('/person')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('cpr');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('gender');
        expect(response.body).toHaveProperty('birthday');
        expect(response.body).toHaveProperty('address');
        expect(response.body.address).toHaveProperty('street');
        expect(response.body.address).toHaveProperty('floor');
        expect(response.body.address).toHaveProperty('door');
        expect(response.body.address).toHaveProperty('postalCode');
        expect(response.body.address.postalCode).toHaveProperty('code');
        expect(response.body.address.postalCode).toHaveProperty('town');
      });
  });

  it('/person?amount=20 returns status 200 and a list of people', () => {
    return request(app.getHttpServer())
      .get(`/person?amount=20`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(20);
      });
  });
});
