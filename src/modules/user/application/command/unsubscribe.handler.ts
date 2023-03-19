import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {User} from '../../../../infrastructure/model/user.entity';
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {UnsubscribeCommand} from "./unsubscribe.command";
import {EmailConfirmationService} from "../../../authentication/application/email-confirmation.service";
import {UserEntityRepository} from "../../db/user-entity-repository.service";

@CommandHandler(UnsubscribeCommand)
export class UnsubscribeHandler implements ICommandHandler<UnsubscribeCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  async execute(command: UnsubscribeCommand): Promise<void> {
    const email = await this.emailConfirmationService.decodeConfirmationToken(command.token);

    const foundUser = await this.userRepository.findByEmail(email);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }

    const user = new User();
    user.user_id = foundUser.user_id;
    user.has_disabled_mail_notifications = true;
    await this.userRepository.saveOrUpdateUser(user);
  }
}
