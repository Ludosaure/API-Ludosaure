import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../../infrastructure/model/user.entity';
import {AuthenticationController} from './authentication.controller';
import {RegisterValidator} from './application/register.validator';
import {UserEntityRepository} from '../user/db/user-entity-repository.service';
import {RegisterHandler} from './application/commands/register.handler';
import {LoginHandler} from './application/commands/login.handler';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {environmentConfig} from '../../config/environment.config';
import {JwtStrategy} from "./strategy/jwt.strategy";
import {EmailModule} from "../email/email.module";
import {EmailConfirmationService} from "./application/email-confirmation.service";
import {ConfirmAccountHandler} from "./application/commands/confirm-account.handler";
import {ResendConfirmationMailHandler} from "./application/commands/resend-confirmation-mail.handler";

@Module({
    imports: [
        CqrsModule,
        PassportModule,
        JwtModule.register({
            secret: environmentConfig.jwtAccessSecret,
            signOptions: {expiresIn: environmentConfig.jwtAccessTokenDuration},
        }),
        TypeOrmModule.forFeature([User]),
        EmailModule,
    ],
    controllers: [AuthenticationController],
    providers: [
        JwtStrategy,
        EmailConfirmationService,
        RegisterValidator,
        UserEntityRepository,
        RegisterHandler,
        LoginHandler,
        ConfirmAccountHandler,
        ResendConfirmationMailHandler,
    ],
    exports: [
        JwtStrategy,
        EmailConfirmationService,
        RegisterValidator,
        UserEntityRepository,
        RegisterHandler,
        LoginHandler,
        ConfirmAccountHandler,
        ResendConfirmationMailHandler,
    ],
})
export class AuthenticationModule {
}
