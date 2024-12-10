import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
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
