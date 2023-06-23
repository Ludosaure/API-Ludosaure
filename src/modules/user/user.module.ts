import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { GetAllUsersHandler } from "./application/query/get-all-users.handler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../domain/model/user.entity";
import { CloseAccountHandler } from "./application/command/close-account.handler";
import { UpdateUserHandler } from "./application/command/update-user.handler";
import { PasswordValidator } from "../../shared/password-validator.service";
import { UnsubscribeHandler } from "./application/command/unsubscribe.handler";
import { EmailAccountConfirmationService } from "../email/mail-bodies/email-account-confirmation.service";
import { JwtStrategy } from "../authentication/strategy/jwt.strategy";
import EmailService from "../email/email.service";
import { UserEntityRepository } from "./user-entity.repository";
import { Media } from "../../domain/model/media.entity";
import { MediaEntityRepository } from "../media/media-entity.repository";
import { GetUserByIdHandler } from "./application/query/get-user-by-id.handler";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User, Media])
  ],
  controllers: [UserController],
  providers: [
    PasswordValidator,
    JwtStrategy,
    EmailAccountConfirmationService,
    EmailService,
    MediaEntityRepository,
    UserEntityRepository,
    GetAllUsersHandler,
    CloseAccountHandler,
    UpdateUserHandler,
    UnsubscribeHandler,
    GetUserByIdHandler,
  ]
})
export class UserModule {
}
