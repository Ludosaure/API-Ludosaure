import { Injectable } from "@nestjs/common";
import { UserEntityRepository } from "./user-entity.repository";
import { MediaService } from "../media/media.service";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly mediaService: MediaService
  ) {}

  async addProfilePicture(userId: string, imageBuffer: Buffer, filename: string) {
    const avatar = await this.mediaService.uploadPublicFile(imageBuffer, filename);
    const user = await this.userRepository.findById(userId);
    user.profilePicture = avatar;
    await this.userRepository.saveOrUpdate(user);
    return avatar;
  }
}
