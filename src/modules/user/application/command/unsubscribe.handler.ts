import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {UnsubscribeCommand} from "./unsubscribe.command";
import {EmailConfirmationService} from "../../../authentication/application/email-confirmation.service";
import {UserEntityRepository} from "../../user-entity.repository";

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

    foundUser.hasEnabledMailNotifications = false;
    await this.userRepository.saveOrUpdate(foundUser);
  }
}
