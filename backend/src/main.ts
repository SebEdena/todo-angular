import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const { network, env, openapi } = config();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  app.enableCors({ origin: network.origins });
  app.enableShutdownHooks();

  if (env === 'local') {
    const openapiConfig = new DocumentBuilder()
      .setTitle(openapi.title)
      .setDescription(openapi.description)
      .setVersion(openapi.version)
      .build();

    openapiConfig.tags = openapi.tags.map((tag) => ({
      name: tag,
    }));

    const document = SwaggerModule.createDocument(app, openapiConfig);
    SwaggerModule.setup(openapi.prefix, app, document);
  }

  await app.listen(network.port, network.host);
}

bootstrap();
