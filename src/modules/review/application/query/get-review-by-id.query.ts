import { GetReviewByIdRequestDto } from "../../dto/request/get-review-by-id-request.dto";

export class GetReviewByIdQuery {
  public readonly id: string;

  private constructor(id: string) {
    this.id = id;
  }

  public static of(getReviewByIdRequest: GetReviewByIdRequestDto): GetReviewByIdQuery {
    const { id } = getReviewByIdRequest;
    return new GetReviewByIdQuery(id);
  }
}
