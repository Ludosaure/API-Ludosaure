import { DeleteMediaRequestDto } from "../../dto/request/delete-media-request.dto";

export class DeleteMediaCommand {
  public readonly mediaId: string;

  private constructor(mediaId: string) {
    this.mediaId = mediaId;
  }

  public static of(deleteMediaRequestDto: DeleteMediaRequestDto): DeleteMediaCommand {
    const { mediaId } = deleteMediaRequestDto;
    return new DeleteMediaCommand(mediaId);
  }
}
