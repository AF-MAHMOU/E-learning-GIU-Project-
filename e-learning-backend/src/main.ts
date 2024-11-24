import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const mongoUri = process.env.MONGODB_URL;
  if (!mongoUri) {
    throw new Error('MONGODB_URL is not defined in the .env file');
  }

  await mongoose.connect(mongoUri);

  await app.listen(3000);
}
bootstrap().catch((err) => console.error('Error during bootstrap:', err));