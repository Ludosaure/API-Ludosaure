import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserEntityRepository } from "../../user-entity.repository";
import { AddProfilePictureCommand } from "./add-profile-picture.command";
import { MediaService } from "../../../media/media.service";
import { UserNotFoundException } from "../../../../shared/exceptions/user-not-found.exception";

@CommandHandler(AddProfilePictureCommand)
export class AddProfilePictureHandler implements ICommandHandler<AddProfilePictureCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly mediaService: MediaService
  ) {
  }

  async execute(command: AddProfilePictureCommand): Promise<void> {
    const { user, imageBuffer, filename } = command;
    const avatar = await this.mediaService.uploadPublicFile(imageBuffer, filename);
    const foundUser = await this.userRepository.findById(user.id);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }
    foundUser.profilePicture = avatar;
    await this.userRepository.saveOrUpdate(foundUser);
  }
}
