import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './user/user.module';
import {DatabaseModule} from "./database/database.module";

@Module({
    controllers: [AppController],
    imports: [
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
        DatabaseModule,
    ],
})
export class AppModule {
}
