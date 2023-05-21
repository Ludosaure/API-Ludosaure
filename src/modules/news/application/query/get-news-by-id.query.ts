import { GetNewsByIdRequestDto } from "../../dto/request/get-news-by-id-request.dto";

export class GetNewsByIdQuery {
  public readonly id: string;
  private constructor(id: string) {
    this.id = id;
  }
  public static of(getNewsByIdRequestDto: GetNewsByIdRequestDto): GetNewsByIdQuery {
    const { id } = getNewsByIdRequestDto;
    return new GetNewsByIdQuery(id);
  }
}
