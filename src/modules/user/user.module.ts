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
import {UnsubscribeHandler} from "./application/command/unsubscribe.handler";
import {EmailConfirmationService} from "../authentication/application/email-confirmation.service";
import {JwtStrategy} from "../authentication/strategy/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {environmentConfig} from "../../config/environment.config";
import {EmailModule} from "../email/email.module";

@Module({
    imports: [
        CqrsModule,
        JwtModule.register({
            secret: environmentConfig.jwtAccessSecret,
            signOptions: {expiresIn: environmentConfig.jwtAccessTokenDuration},
        }),
        TypeOrmModule.forFeature([User]),
        EmailModule,
    ],
    controllers: [UserController],
    providers: [
        JwtStrategy,
        EmailConfirmationService,
        UserEntityRepository,
        GetAllUsersHandler,
        CloseAccountHandler,
        UpdateUserHandler,
        PasswordValidator,
        UnsubscribeHandler,
    ],
    exports: [
        JwtStrategy,
        EmailConfirmationService,
        UserEntityRepository,
        GetAllUsersHandler,
        CloseAccountHandler,
        UpdateUserHandler,
        PasswordValidator,
        UnsubscribeHandler,
    ],
})
export class UserModule {
}
