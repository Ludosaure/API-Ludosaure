import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCommand } from './register.command';
import { MailAlreadyUsedException } from '../../exception/mail-already-used.exception';
import { User } from '../../../../infrastructure/model/user.entity';
import { hash } from 'argon2';
import { UserEntityRepository } from '../../../user/db/user-entity-repository.service';
import { RegisterValidator } from '../register.validator';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly registerValidator: RegisterValidator,
  ) {}

  async execute(command: RegisterCommand): Promise<void> {
    const foundUser = await this.userRepository.findByEmail(command.email);
    if (foundUser != null) {
      throw new MailAlreadyUsedException();
    }

    this.registerValidator.validate(command);
    const user = new User();
    user.email = command.email;
    user.firstname = command.firstname;
    user.lastname = command.lastname;
    user.phone = command.phone;
    user.password = await hash(command.password);
    await this.userRepository.saveUser(user);
  }
}
