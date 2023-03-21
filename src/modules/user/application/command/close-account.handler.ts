import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {UserEntityRepository} from '../../db/user-entity-repository.service';
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {CloseAccountCommand} from "./close-account.command";

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

    foundUser.is_account_closed = true;
    await this.userRepository.saveOrUpdateUser(foundUser);
  }
}
