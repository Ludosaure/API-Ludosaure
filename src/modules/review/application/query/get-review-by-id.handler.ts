import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ReviewEntityRepository } from "../../review-entity.repository";
import { GetReviewByIdQuery } from "./get-review-by-id.query";

@QueryHandler(GetReviewByIdQuery)
export class GetReviewByIdHandler implements IQueryHandler<GetReviewByIdQuery> {
  constructor(private readonly reviewRepository: ReviewEntityRepository) {
  }

  async execute(query: GetReviewByIdQuery) {
    return await this.reviewRepository.findById(query.id);
  }
}
