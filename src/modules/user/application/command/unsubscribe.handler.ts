import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {UnsubscribeCommand} from "./unsubscribe.command";
import {EmailAccountConfirmationService} from "../../../email/mail-bodies/email-account-confirmation.service";
import {UserEntityRepository} from "../../user-entity.repository";

@CommandHandler(UnsubscribeCommand)
export class UnsubscribeHandler implements ICommandHandler<UnsubscribeCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly emailAccountConfirmationService: EmailAccountConfirmationService,
  ) {}

  async execute(command: UnsubscribeCommand): Promise<void> {
    const email = await this.emailAccountConfirmationService.decodeConfirmationToken(command.token);

    const foundUser = await this.userRepository.findByEmail(email);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }

    foundUser.hasEnabledMailNotifications = false;
    await this.userRepository.saveOrUpdate(foundUser);
  }
}
