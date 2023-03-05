import {Module} from '@nestjs/common';
import {UserController} from "./user.controller";
import {userProviders} from "./user.provider";
import {CqrsModule} from "@nestjs/cqrs";
import {GetAllUsersHandler} from "./application/query/get-all-users.handler";
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule
    ],
    controllers: [UserController],
    providers: [
        ...userProviders,
        GetAllUsersHandler,
    ],
})
export class UserModule {
}
