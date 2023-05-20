import { UpdateNewsRequestDto } from "../../dto/request/update-news-request.dto";

export class UpdateNewsCommand {
  public readonly id: string;
  public readonly endDate: Date;
  private constructor(id: string, endDate: Date) {
    this.id = id;
    this.endDate = endDate;
  }
  public static of(updateNewsRequestDto: UpdateNewsRequestDto): UpdateNewsCommand {
    const { id, endDate } = updateNewsRequestDto;
    return new UpdateNewsCommand(id, endDate);
  }
}
