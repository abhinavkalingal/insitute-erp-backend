import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/super-admin/login (POST)', () => {
    it('should login super admin with valid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/super-admin/login')
        .send({
          email: 'admin@institute.com',
          password: 'admin123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('admin@institute.com');
    });

    it('should reject super admin login with invalid password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/super-admin/login')
        .send({
          email: 'admin@institute.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
    });
  });
});
