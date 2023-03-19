import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {CqrsModule} from '@nestjs/cqrs';
import {GetAllUsersHandler} from './application/query/get-all-users.handler';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../../infrastructure/model/user.entity';
import {UserEntityRepository} from './db/user-entity-repository.service';
import {CloseAccountHandler} from "./application/command/close-account.handler";
import {UpdateUserHandler} from "./application/command/update-user.handler";
import {PasswordValidator} from "../../shared/password-validator.service";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [
        UserEntityRepository,
        GetAllUsersHandler,
        CloseAccountHandler,
        UpdateUserHandler,
        PasswordValidator,
    ],
    exports: [
        UserEntityRepository,
        GetAllUsersHandler,
        CloseAccountHandler,
        UpdateUserHandler,
        PasswordValidator,
    ],
})
export class UserModule {
}
