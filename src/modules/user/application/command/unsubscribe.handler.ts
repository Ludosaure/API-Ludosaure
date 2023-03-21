import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
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

    foundUser.has_enabled_mail_notifications = false;
    await this.userRepository.saveOrUpdateUser(foundUser);
  }
}
