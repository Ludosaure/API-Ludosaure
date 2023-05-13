import { Media } from "../../../../domain/model/media.entity";

export class AddProfilePictureResponseDto {
  readonly profilePicture: Media;
  constructor(profilePicture: Media) {
    this.profilePicture = profilePicture;
  }
}
