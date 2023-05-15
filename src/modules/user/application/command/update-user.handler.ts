import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserNotFoundException } from "../../../../shared/exceptions/user-not-found.exception";
import { UpdateUserCommand } from "./update-user.command";
import { PasswordValidator } from "../../../../shared/password-validator.service";
import { hash } from "argon2";
import { UserEntityRepository } from "../../user-entity.repository";
import { Media } from "../../../../domain/model/media.entity";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly passwordValidator: PasswordValidator,
  ) {
  }

  async execute(command: UpdateUserCommand): Promise<void> {
    const foundUser = await this.userRepository.findById(command.userId);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }

    if (command.password != null && command.confirmPassword != null) {
      this.passwordValidator.validate(command.password, command.confirmPassword);
    }

    if (command.password != null)
      foundUser.password = await hash(command.password);
    if (command.phoneNumber != null)
      foundUser.phone = command.phoneNumber;
    if (command.pseudo != null)
      foundUser.pseudo = command.pseudo;
    if (command.hasEnabledMailNotifications != null)
      foundUser.hasEnabledMailNotifications = command.hasEnabledMailNotifications;
    if (command.hasEnabledPhoneNotifications != null)
      foundUser.hasEnabledPhoneNotifications = command.hasEnabledPhoneNotifications;
    if (command.profilePictureId != null) {
      const profilePicture = new Media();
      profilePicture.id = command.profilePictureId;
      foundUser.profilePicture = profilePicture;
    }
    await this.userRepository.saveOrUpdate(foundUser);
  }
}
