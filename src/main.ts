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

  // Enable CORS to allow requests from the frontend
  app.enableCors({
    origin: 'http://localhost:3001', // Frontend URL
    credentials: true, // Allow cookies and other credentials
  });

  const mongoUri = process.env.MONGODB_URL;
  if (!mongoUri) {
    throw new Error('MONGODB_URL is not defined in the .env file');
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB:', mongoUri);

  // Listen on port 3000
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log JWT_SECRET for debugging
}

// Catch any errors during bootstrap
bootstrap().catch((err) => console.error('Error during bootstrap:', err));
