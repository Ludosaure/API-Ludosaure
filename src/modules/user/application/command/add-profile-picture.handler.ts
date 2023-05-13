import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserEntityRepository } from "../../user-entity.repository";
import { AddProfilePictureCommand } from "./add-profile-picture.command";
import { MediaService } from "../../../media/media.service";
import { UserNotFoundException } from "../../../../shared/exceptions/user-not-found.exception";
import { AddProfilePictureResponseDto } from "../../dto/response/add-profile-picture-response.dto";

@CommandHandler(AddProfilePictureCommand)
export class AddProfilePictureHandler implements ICommandHandler<AddProfilePictureCommand> {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly mediaService: MediaService
  ) {
  }

  async execute(command: AddProfilePictureCommand): Promise<AddProfilePictureResponseDto> {
    const { user, imageBuffer, filename } = command;
    const profilePicture = await this.mediaService.uploadPublicFile(imageBuffer, filename);
    const foundUser = await this.userRepository.findById(user.id);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }
    foundUser.profilePicture = profilePicture;
    await this.userRepository.saveOrUpdate(foundUser);
    return new AddProfilePictureResponseDto(profilePicture);
  }
}
