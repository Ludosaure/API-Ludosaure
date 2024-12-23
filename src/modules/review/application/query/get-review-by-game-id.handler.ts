import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetReviewByGameIdQuery } from "./get-review-by-game-id.query";
import { ReviewEntityRepository } from "../../review-entity.repository";

@QueryHandler(GetReviewByGameIdQuery)
export class GetReviewByGameIdHandler implements IQueryHandler<GetReviewByGameIdQuery> {
  constructor(private readonly reviewRepository: ReviewEntityRepository) {
  }

  async execute(query: GetReviewByGameIdQuery) {
    return await this.reviewRepository.findByGameId(query.id);
  }
}
