import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';
import type { ConfigObject } from 'src/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<ConfigObject, true>>(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api');

  const port = config.get('port');
  await app.listen(port);
}

void bootstrap();
