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
import {CloseAccountCommand} from "./close-account.command";

@CommandHandler(CloseAccountCommand)
export class CloseAccountHandler implements ICommandHandler<CloseAccountCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
  ) {}

  async execute(command: CloseAccountCommand): Promise<void> {
    const foundUser = await this.userRepository.findById(command.userId);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }

    const user = new User();
    user.user_id = foundUser.user_id;
    user.is_account_closed = true;
    await this.userRepository.saveOrUpdateUser(user);
  }
}
