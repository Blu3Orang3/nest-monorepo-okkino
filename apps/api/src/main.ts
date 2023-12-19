/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { NestFastifyApplication, FastifyAdapter } from "@nestjs/platform-fastify";
import helmet from '@fastify/helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(helmet,{
    // should be turned on in production
    contentSecurityPolicy: false,
  });

  app.enableCors()

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application playground is running on: http://localhost:${port}/graphiql`);
}

bootstrap();
