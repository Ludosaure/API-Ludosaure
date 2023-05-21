import { CreateNewsRequestDto } from "../../dto/request/create-news-request.dto";

export class CreateNewsCommand {
  public readonly endDate: Date;
  public readonly pictureId: string;
  private constructor(endDate: Date, pictureId: string) {
    this.endDate = endDate;
    this.pictureId = pictureId;
  }
  public static of(createNewsRequestDto: CreateNewsRequestDto): CreateNewsCommand {
    const { endDate, pictureId } = createNewsRequestDto;
    return new CreateNewsCommand(endDate, pictureId);
  }
}
