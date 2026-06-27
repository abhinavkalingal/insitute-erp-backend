import 'dotenv/config';
import { AllExceptionsFilter } from '@core/exceptions/all-exceptions.filter';
import { ResponseInterceptor } from '@core/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Security Headers
  app.use(helmet());

  // Enable CORS with strict rules for production
  const isProd = process.env.NODE_ENV === 'production';
  const allowedOrigin = isProd ? (process.env.FRONTEND_URL || false) : true;
  app.enableCors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Set pino logger
  app.useLogger(app.get(Logger));

  // Set global prefix for all routes (optional but recommended for APIs)
  app.setGlobalPrefix('api/v1');

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true}),
  );

  // Enable global exception filter
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Enable global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Institute ERP API')
    .setDescription('The API documentation for the Institute ERP System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api/v1`);
  console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap().catch(console.error);
