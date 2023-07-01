import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateReviewCommand } from "./update-review.command";
import { ReviewEntityRepository } from "../../review-entity.repository";
import { ReviewNotFoundException } from "../../exceptions/review-not-found.exception";

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler implements ICommandHandler<UpdateReviewCommand> {
  constructor(private readonly reviewRepository: ReviewEntityRepository) {
  }

  async execute(command: UpdateReviewCommand): Promise<void> {
    const foundReview = await this.reviewRepository.findByGameIdAndUserId(command.gameId, command.user.id);
    if (foundReview == null) {
      throw new ReviewNotFoundException();
    }

    if (command.rating != null) {
      foundReview.rating = command.rating;
    }

    if (command.comment != null) {
      foundReview.comment = command.comment;
    }

    await this.reviewRepository.saveOrUpdate(foundReview);
  }
}
