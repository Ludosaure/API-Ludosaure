import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCommand } from './register.command';
import { MailAlreadyUsedException } from '../../exception/mail-already-used.exception';
import { User } from '../../../../domain/model/user.entity';
import { hash } from 'argon2';
import { PasswordValidator } from '../../../../shared/password-validator.service';
import {EmailAccountConfirmationService} from "../../../email/email-account-confirmation.service";
import {UserEntityRepository} from "../../../user/user-entity.repository";

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly passwordValidator: PasswordValidator,
    private readonly emailAccountConfirmationService: EmailAccountConfirmationService
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
    await this.userRepository.saveOrUpdate(user);

    await this.emailAccountConfirmationService.sendVerificationLink(user.email);
  }
}
