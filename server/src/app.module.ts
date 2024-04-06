import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { configuration } from 'src/config/configuration';
import { ApiModule } from 'src/api/api.module';
import { typeOrmConfig } from 'src/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => await typeOrmConfig(configService),
      inject: [ConfigService]
    }),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
