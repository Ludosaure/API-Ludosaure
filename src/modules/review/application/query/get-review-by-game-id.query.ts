import { GetReviewByGameIdRequestDto } from "../../dto/request/get-review-by-game-id-request.dto";

export class GetReviewByGameIdQuery {
  public readonly id: string;

  private constructor(id: string) {
    this.id = id;
  }

  public static of(getReviewByGameIdRequestDto: GetReviewByGameIdRequestDto): GetReviewByGameIdQuery {
    const { id } = getReviewByGameIdRequestDto;
    return new GetReviewByGameIdQuery(id);
  }
}
