import {Module} from '@nestjs/common';
import {UserController} from "./user.controller";
import {userProviders} from "./user.provider";
import {CqrsModule} from "@nestjs/cqrs";
import {GetAllUsersHandler} from "./application/query/get-all-users.handler";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../database/model/user.entity";
import {UserRepository} from "./user.repository";

@Module({
    imports: [
        CqrsModule, TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [
        UserRepository,
        GetAllUsersHandler,
    ],
    exports: [UserRepository, GetAllUsersHandler]
})
export class UserModule {
}
