import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './modules/user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {environmentConfig} from './config/environment.config';
import {AuthenticationModule} from './modules/authentication/authentication.module';
import {EmailModule} from './modules/email/email.module';
import {CoreModule} from "./core.module";
import {GameModule} from "./modules/game/game.module";
import {CategoryModule} from "./modules/category/category.module";
import {UnavailabilityModule} from "./modules/unavailability/unavailability.module";

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
        /** 
         * extra est ajouté spécifiquement pour ElephantSQL free qui n'accepte qu'une connexion à la fois,
         * potentiellement à supprimer quand on repassera sur AWS
         */
        extra: {
          max: 1,
        }
      }),
    }),
    CoreModule,
    UserModule,
    AuthenticationModule,
    EmailModule,
    GameModule,
    CategoryModule,
    UnavailabilityModule,
  ],
})
export class AppModule {}
