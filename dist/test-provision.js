"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const institutes_service_1 = require("./src/modules/institutes/institutes.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const institutesService = app.get(institutes_service_1.InstitutesService);
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
    }
    catch (error) {
        console.error('Error during testing:', error);
    }
    setTimeout(async () => {
        console.log('Done waiting for background task.');
        await app.close();
    }, 15000);
}
bootstrap();
//# sourceMappingURL=test-provision.js.map