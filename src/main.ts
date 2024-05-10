import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HandlerExceptionFilter } from './handler-exception/handler-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HandlerExceptionFilter(httpAdapter));

  // Validation and Transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Convert the requet to the approriate object
      whitelist: true, // Only declaread properties on DTO are permited
      forbidNonWhitelisted: true, // If an extra property is passed, it throw an error
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API with Prisma')
    .setDescription('Test API')
    .setVersion('0.1')
    .addServer('/api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/swagger', app, document);

  // Application prefix
  app.setGlobalPrefix('/api/v1');

  // Aplication port
  await app.listen(8080);
}
bootstrap();
