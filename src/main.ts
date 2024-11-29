import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();


async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const mongoUri = process.env.MONGODB_URL;
  if (!mongoUri) {
    throw new Error('MONGODB_URL is not defined in the .env file');
  }

  await mongoose.connect(mongoUri);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');  // Added log here
 console.log('JWT_SECRET:', process.env.JWT_SECRET); 

}
bootstrap().catch((err) => console.error('Error during bootstrap:', err));
