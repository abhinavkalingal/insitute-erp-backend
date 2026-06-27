"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const all_exceptions_filter_1 = require("./core/exceptions/all-exceptions.filter");
const response_interceptor_1 = require("./core/interceptors/response.interceptor");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const nestjs_pino_1 = require("nestjs-pino");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    const isProd = process.env.NODE_ENV === 'production';
    const allowedOrigin = isProd ? (process.env.FRONTEND_URL || false) : true;
    app.enableCors({
        origin: allowedOrigin,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
    });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    const httpAdapter = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(httpAdapter));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Institute ERP API')
        .setDescription('The API documentation for the Institute ERP System')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}/api/v1`);
    console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap().catch(console.error);
//# sourceMappingURL=main.js.map