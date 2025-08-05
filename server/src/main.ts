import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiKeyGuard } from './common/guards/api-key.guard';

async function bootstrap() {
  const logger = new Logger('Main (main.ts)');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // x-api-key-auth global guard
  app.useGlobalGuards(new ApiKeyGuard(configService));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Ranker App Api')
    .setDescription(
      'Ranker App, A real-time application that allows users to create polls and invite others to join and vote instantly.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'Enter your API key',
      } as SecuritySchemeObject,
      'x-api-key-auth',
    )
    .addSecurityRequirements('x-api-key-auth')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors({
    origin: configService.get('CLIENT_HOST') || 'http://localhost:8080',
  });
  const port = parseInt(configService.get('PORT') || '3000', 10) || 3000;
  await app.listen(port);
  logger.log(`Server running on port ${port}`);
}
bootstrap();
