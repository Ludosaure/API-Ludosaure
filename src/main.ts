import { config } from "dotenv";
config();
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { environmentConfig } from "./config/environment.config";
import { config as awsConfig } from "aws-sdk";

function setupSwagger(app: NestFastifyApplication): void {
  const config = new DocumentBuilder()
    .setTitle("API-Ludosaure")
    .setDescription("La ludosaure API description")
    .setVersion("1.0")
    .addTag("api")
    .addBearerAuth()
    .build();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  awsConfig.update({
    accessKeyId: environmentConfig.awsAccessKeyId,
    secretAccessKey: environmentConfig.awsSecretAccessKey,
    region: environmentConfig.awsRegion
  });
}

async function bootstrap() {
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  setupSwagger(app);
  await app.listen(environmentConfig.port, "0.0.0.0");
  logger.log(`Application started on port ${environmentConfig.port}`);
  logger.log(await app.getUrl());
}

bootstrap();
