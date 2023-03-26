import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {CloseAccountCommand} from "./close-account.command";
import {UserEntityRepository} from "../../user-entity.repository";

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

    foundUser.isAccountClosed = true;
    await this.userRepository.saveOrUpdateUser(foundUser);
  }
}
