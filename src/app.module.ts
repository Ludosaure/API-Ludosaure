import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import {environmentConfig} from "./config/environment.config";
import {UserModule} from "./features/user/user.module";

@Module({
  imports: [
      UserModule,
      ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
            useFactory: () => ({
                type: 'postgres',
                url: "",
                entities: ['dist/**/*.entity{.ts,.js}'],
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
  ],
  controllers: [AppController],
})
export class AppModule {}
