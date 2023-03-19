import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {User} from '../../../../infrastructure/model/user.entity';
import {UserEntityRepository} from '../../../user/db/user-entity-repository.service';
import {EmailConfirmationService} from "../email-confirmation.service";
import {ConfirmAccountCommand} from "./confirm-account.command";
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
    user.user_id = foundUser.user_id;
    user.is_account_verified = true;
    await this.userRepository.saveOrUpdateUser(user);
  }
}
