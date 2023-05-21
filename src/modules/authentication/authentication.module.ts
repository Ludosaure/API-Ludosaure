import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../domain/model/user.entity";
import { AuthenticationController } from "./authentication.controller";
import { PasswordValidator } from "../../shared/password-validator.service";
import { RegisterHandler } from "./application/commands/register.handler";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { EmailAccountConfirmationService } from "../email/mail-bodies/email-account-confirmation.service";
import { ConfirmAccountHandler } from "./application/commands/confirm-account.handler";
import { ResendConfirmationMailHandler } from "./application/commands/resend-confirmation-mail.handler";
import EmailService from "../email/email.service";
import { UserEntityRepository } from "../user/user-entity.repository";
import { AuthenticationService } from "./authentication.service";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [
        CqrsModule,
        PassportModule,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthenticationController],
    providers: [
        JwtStrategy,
        LocalStrategy,
        EmailAccountConfirmationService,
        AuthenticationService,
        EmailService,
        PasswordValidator,
        UserEntityRepository,
        RegisterHandler,
        ConfirmAccountHandler,
        ResendConfirmationMailHandler,
    ],
})
export class AuthenticationModule {
}
