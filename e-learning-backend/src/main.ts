import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cors = require('cors');
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
  app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
  }));
  
  await app.listen(process.env.PORT);
  console.log(`Application is running on: http://localhost:${process.env.PORT}`);
 console.log('JWT_SECRET:', process.env.JWT_SECRET); 

}
bootstrap().catch((err) => console.error('Error during bootstrap:', err));
