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
import {FaqModule} from "./modules/faq/faq.module";
import {FavoriteModule} from "./modules/favorite/favorite.module";
import {InvoiceModule} from "./modules/invoice/invoice.module";
import {MediaModule} from "./modules/media/media.module";
import {MessageModule} from "./modules/message/message.module";
import {NewsModule} from "./modules/news/news.module";
import {NotificationModule} from "./modules/notification/notification.module";
import {ReservationModule} from "./modules/reservation/reservation.module";
import {ReviewModule} from "./modules/review/review.module";
import {PlanModule} from "./modules/plan/plan.module";
import { CgvModule } from './modules/cgv/cgv.module';
import { ScheduleModule } from '@nestjs/schedule';

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
        ScheduleModule.forRoot(),
        CoreModule,
        UserModule,
        AuthenticationModule,
        EmailModule,
        GameModule,
        CategoryModule,
        UnavailabilityModule,
        PlanModule,
        FaqModule,
        FavoriteModule,
        InvoiceModule,
        MediaModule,
        MessageModule,
        NewsModule,
        NotificationModule,
        ReservationModule,
        ReviewModule,
        CgvModule,
    ],
})
export class AppModule {
}
