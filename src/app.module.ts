import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './modules/user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {environmentConfig} from './config/environment.config';
import {AuthenticationModule} from './modules/authentication/authentication.module';
import {EmailModule} from './modules/email/email.module';
import {CoreModule} from "./core.module";

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        url: environmentConfig.dbUrl,
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CoreModule,
    UserModule,
    AuthenticationModule,
    EmailModule,
  ],
})
export class AppModule {}
