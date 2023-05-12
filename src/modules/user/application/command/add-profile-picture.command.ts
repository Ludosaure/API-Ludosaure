import { User } from "../../../../domain/model/user.entity";

export class AddProfilePictureCommand {
  public readonly user: User;
  public readonly imageBuffer: Buffer;
  public readonly filename: string;

  private constructor(user: User, buffer: Buffer, filename: string) {
    this.user = user;
    this.imageBuffer = buffer;
    this.filename = filename;
  }

  public static of(user: User, buffer: Buffer, filename: string): AddProfilePictureCommand {
    return new AddProfilePictureCommand(user, buffer, filename);
  }
}
