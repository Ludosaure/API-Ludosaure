import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {EmailAccountConfirmationService} from "../../../email/email-account-confirmation.service";
import {ConfirmAccountCommand} from "./confirm-account.command";
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {UserEntityRepository} from "../../../user/user-entity.repository";

@CommandHandler(ConfirmAccountCommand)
export class ConfirmAccountHandler implements ICommandHandler<ConfirmAccountCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly emailAccountConfirmationService: EmailAccountConfirmationService,
  ) {}

  async execute(command: ConfirmAccountCommand): Promise<void> {
    const email = await this.emailAccountConfirmationService.decodeConfirmationToken(command.token);

    const foundUser = await this.userRepository.findByEmail(email);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }

    foundUser.isAccountVerified = true;
    await this.userRepository.saveOrUpdate(foundUser);
  }
}
