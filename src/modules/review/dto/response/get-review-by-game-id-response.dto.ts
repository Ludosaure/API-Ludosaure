import { Review } from "../../../../domain/model/review.entity";

export class GetReviewByGameIdResponseDto {
  readonly reviews: Review[];
  constructor(reviews: Review[]) {
    this.reviews = reviews;
  }
}
