import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { InstitutesService } from './src/modules/institutes/institutes.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const institutesService = app.get(InstitutesService);

  console.log('Testing Tenant Provisioning via InstitutesService...');

  try {
    const result = await institutesService.create({
      name: 'Test Academy',
      domain: 'testacademy3.example.com',
      databaseUrl: 'dummy-url-will-be-replaced',
      isActive: true,
      profile: {
        contactEmail: 'admin@testacademy.com',
        adminName: 'John Doe',
      },
      settings: {}
    });

    console.log('Institute created in master DB:', result);
    console.log('Provisioning should be running in the background. Check the logs above.');
  } catch (error) {
    console.error('Error during testing:', error);
  }

  // Keep alive for a bit to let the background provisioning finish
  setTimeout(async () => {
    console.log('Done waiting for background task.');
    await app.close();
  }, 15000);
}

bootstrap();
