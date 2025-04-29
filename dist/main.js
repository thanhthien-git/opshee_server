"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });
    const port = process.env.PORT || 3000;
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.enableCors({
        origin: '*',
        methods: 'GET, POST, PUT, DELETE, PATCH',
        allowedHeaders: 'Content-Type, Authorization',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('OPSHEE API')
        .setDescription('APU documentation for Opshee E-commerce system')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/swagger', app, document);
    await app.listen(port, () => {
        console.log(`server is now running on port: ${port}`);
    });
}
bootstrap();
