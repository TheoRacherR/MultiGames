/* eslint-disable @typescript-eslint/no-require-imports */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // ou ['http://localhost:3000']
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('@nestjs/class-transformer'),
    }),
  );

  await app.listen(process.env.NEST_PORT || 3333);
}
bootstrap();
