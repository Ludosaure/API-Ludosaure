import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';

import {RegisterCommand} from './register.command';
import {MailAlreadyUsedException} from '../../exception/mail-already-used.exception';
import {User} from '../../../../infrastructure/model/user.entity';
import {hash} from 'argon2';
import {UserEntityRepository} from '../../../user/db/user-entity-repository.service';
import {PasswordValidator} from '../../../../shared/password-validator.service';
import {EmailConfirmationService} from "../email-confirmation.service";

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly passwordValidator: PasswordValidator,
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  async execute(command: RegisterCommand): Promise<void> {
    const foundUser = await this.userRepository.findByEmail(command.email);
    if (foundUser != null) {
      throw new MailAlreadyUsedException();
    }

    this.passwordValidator.validate(command.password, command.confirmPassword);
    const user = new User();
    user.email = command.email;
    user.firstname = command.firstname;
    user.lastname = command.lastname;
    user.phone = command.phone;
    user.password = await hash(command.password);
    await this.userRepository.saveOrUpdateUser(user);

    await this.emailConfirmationService.sendVerificationLink(user.email);
  }
}
