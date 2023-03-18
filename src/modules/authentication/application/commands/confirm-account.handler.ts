import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCommand } from './register.command';
import { MailAlreadyUsedException } from '../../exception/mail-already-used.exception';
import { User } from '../../../../infrastructure/model/user.entity';
import { hash } from 'argon2';
import { UserEntityRepository } from '../../../user/db/user-entity-repository.service';
import { RegisterValidator } from '../register.validator';
import {EmailConfirmationService} from "../email-confirmation.service";
import {ConfirmAccountCommand} from "./confirm-account.command";
import {BadRequestException} from "@nestjs/common";
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";

@CommandHandler(ConfirmAccountCommand)
export class ConfirmAccountHandler implements ICommandHandler<ConfirmAccountCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  async execute(command: ConfirmAccountCommand): Promise<void> {
    const email = await this.emailConfirmationService.decodeConfirmationToken(command.token);

    const foundUser = await this.userRepository.findByEmail(email);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }

    const user = new User();
    user.id = foundUser.id;
    user.is_account_verified = true;
    await this.userRepository.updateUser(user);
  }
}
