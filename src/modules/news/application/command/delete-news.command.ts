import { DeleteNewsRequestDto } from "../../dto/request/delete-news-request.dto";

export class DeleteNewsCommand {
  public readonly id: string;

  private constructor(id: string) {
    this.id = id;
  }

  public static of(deleteNewsRequestDto: DeleteNewsRequestDto): DeleteNewsCommand {
    const { id } = deleteNewsRequestDto;
    return new DeleteNewsCommand(id);
  }
}
