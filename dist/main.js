"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.enableCors({
        origin: '*',
        methods: 'GET, POST, PUT, DELETE, PATCH',
        allowedHeaders: 'Content-Type, Authorization',
    });
    await app.listen(port, () => {
        console.log(`server is now running on port: ${port}`);
    });
}
bootstrap();
