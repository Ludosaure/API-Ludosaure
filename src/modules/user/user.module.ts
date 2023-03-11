import {Module} from '@nestjs/common';
import {UserController} from "./user.controller";
import {CqrsModule} from "@nestjs/cqrs";
import {GetAllUsersHandler} from "./application/query/get-all-users.handler";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../infrastructure/model/user.entity";
import {UserEntityRepository} from "./db/user-entity-repository.service";
import {RegisterHandler} from "./application/commands/register.handler";
import {JwtModule, JwtService} from '@nestjs/jwt';
import {LoginHandler} from "./application/commands/login.handler";
import {RegisterValidator} from "./application/register.validator";
import {PassportModule} from "@nestjs/passport";
import {environmentConfig} from "../../config/environment.config";

@Module({
    imports: [
        CqrsModule,
        PassportModule,
        JwtModule.register({
            secret: environmentConfig.jwtAccessSecret,
            signOptions: { expiresIn: environmentConfig.jwtAccessTokenDuration },
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [
        RegisterValidator,
        UserEntityRepository,
        GetAllUsersHandler,
        RegisterHandler,
        LoginHandler,
    ],
    exports: [
        RegisterValidator,
        UserEntityRepository,
        GetAllUsersHandler,
        RegisterHandler,
        LoginHandler,
    ]
})
export class UserModule {
}
