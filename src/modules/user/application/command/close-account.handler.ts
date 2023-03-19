import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {User} from '../../../../infrastructure/model/user.entity';
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

    const user = new User();
    user.user_id = foundUser.user_id;
    user.is_account_closed = true;
    await this.userRepository.saveOrUpdateUser(user);
  }
}
