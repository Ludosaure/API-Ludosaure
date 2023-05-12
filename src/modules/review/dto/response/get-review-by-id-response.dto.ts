import { Review } from "../../../../domain/model/review.entity";

export class GetReviewByIdResponseDto {
  readonly reviews: Review[];
  constructor(reviews: Review[]) {
    this.reviews = reviews;
  }
}
