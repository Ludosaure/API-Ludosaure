import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ReviewEntityRepository } from "../../review-entity.repository";
import { ReviewNotFoundException } from "../../exceptions/review-not-found.exception";
import { DeleteReviewCommand } from "./delete-review.command";

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler implements ICommandHandler<DeleteReviewCommand> {
  constructor(private readonly reviewRepository: ReviewEntityRepository) {
  }

  async execute(command: DeleteReviewCommand): Promise<void> {
    const foundReview = await this.reviewRepository.findById(command.id);
    if (foundReview == null) {
      throw new ReviewNotFoundException();
    }
    await this.reviewRepository.deleteReview(foundReview);
  }
}
