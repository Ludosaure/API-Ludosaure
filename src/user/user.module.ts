import {Module} from '@nestjs/common';
import {UserController} from "./user.controller";
import {DatabaseModule} from "../database/database.module";
import {userProviders} from "./user.provider";
import {CqrsModule} from "@nestjs/cqrs";
import {GetAllUsersHandler} from "./application/query/get-all-users.handler";

@Module({
    imports: [CqrsModule, DatabaseModule],
    controllers: [UserController],
    providers: [
        ...userProviders,
        GetAllUsersHandler
    ],
})
export class UserModule {
}
