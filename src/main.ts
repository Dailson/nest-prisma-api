import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Convert the requet to the approriate object
      whitelist: true, // Only declaread properties on DTO are permited
      forbidNonWhitelisted: true, // If an extra property is passed, it throw an error
    }),
  );

  // Application prefix
  app.setGlobalPrefix('/api/v1');

  // Aplication port
  await app.listen(8080);
}
bootstrap();
