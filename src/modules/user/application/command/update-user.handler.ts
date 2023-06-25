import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserNotFoundException } from "../../../../shared/exceptions/user-not-found.exception";
import { UpdateUserCommand } from "./update-user.command";
import { PasswordValidator } from "../../../../shared/password-validator.service";
import { hash } from "argon2";
import { UserEntityRepository } from "../../user-entity.repository";
import { MediaNotFoundException } from "../../../../shared/exceptions/media-not-found.exception";
import { MediaEntityRepository } from "../../../media/media-entity.repository";
import { User } from "../../../../domain/model/user.entity";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly passwordValidator: PasswordValidator,
    private readonly mediaRepository: MediaEntityRepository,
  ) {
  }

  async execute(command: UpdateUserCommand): Promise<User> {
    const foundUser = await this.userRepository.findById(command.userId);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }

    if (command.password != null && command.confirmPassword != null) {
      this.passwordValidator.validate(command.password, command.confirmPassword);
      foundUser.password = await hash(command.password);
    }
    if (command.phoneNumber != null)
      foundUser.phone = command.phoneNumber;
    if (command.pseudo != null)
      foundUser.pseudo = command.pseudo;
    if (command.hasEnabledMailNotifications != null)
      foundUser.hasEnabledMailNotifications = command.hasEnabledMailNotifications;
    if (command.hasEnabledPhoneNotifications != null)
      foundUser.hasEnabledPhoneNotifications = command.hasEnabledPhoneNotifications;
    if (command.profilePictureId != null) {
      const profilePicture = await this.mediaRepository.findById(command.profilePictureId);
      if(profilePicture == null) {
        throw new MediaNotFoundException();
      }
      foundUser.profilePicture = profilePicture;
    }
    await this.userRepository.saveOrUpdate(foundUser);

    return foundUser;
  }
}
