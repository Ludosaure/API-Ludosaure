import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../../infrastructure/model/user.entity';
import {AuthenticationController} from './authentication.controller';
import {PasswordValidator} from '../../shared/password-validator.service';
import {UserEntityRepository} from '../user/db/user-entity-repository.service';
import {RegisterHandler} from './application/commands/register.handler';
import {LoginHandler} from './application/commands/login.handler';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from "./strategy/jwt.strategy";
import {EmailConfirmationService} from "./application/email-confirmation.service";
import {ConfirmAccountHandler} from "./application/commands/confirm-account.handler";
import {ResendConfirmationMailHandler} from "./application/commands/resend-confirmation-mail.handler";
import EmailService from "../email/email.service";

@Module({
    imports: [
        CqrsModule,
        PassportModule,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthenticationController],
    providers: [
        JwtStrategy,
        EmailConfirmationService,
        EmailService,
        PasswordValidator,
        UserEntityRepository,
        RegisterHandler,
        LoginHandler,
        ConfirmAccountHandler,
        ResendConfirmationMailHandler,
    ],
})
export class AuthenticationModule {
}
