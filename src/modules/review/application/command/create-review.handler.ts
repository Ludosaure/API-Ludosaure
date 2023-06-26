import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateReviewCommand } from "./create-review.command";
import { ReviewEntityRepository } from "../../review-entity.repository";
import { GameEntityRepository } from "../../../game/game-entity.repository";
import { GameNotFoundException } from "../../../../shared/exceptions/game-not-found.exception";
import { Review } from "../../../../domain/model/review.entity";
import { UserAlreadyReviewedThisGameException } from "../../exceptions/user-already-reviewed-this-game.exception";
import { ReservationEntityRepository } from "../../../reservation/reservation-entity.repository";
import {
  YouCantReviewAGameThatYouNeverReservedException
} from "../../exceptions/you-cant-review-a-game-that-you-never-reserved.exception";

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler implements ICommandHandler<CreateReviewCommand> {
  constructor(private readonly reviewRepository: ReviewEntityRepository,
              private readonly gameRepository: GameEntityRepository,
              private readonly reservationRepository: ReservationEntityRepository) {
  }

  async execute(command: CreateReviewCommand): Promise<void> {
    const foundGame = await this.gameRepository.findById(command.gameId);
    if (foundGame == null) {
      throw new GameNotFoundException();
    }
    const foundReview = await this.reviewRepository.findByGameIdAndUserId(foundGame.id, command.user.id);
    if (foundReview != null) {
      throw new UserAlreadyReviewedThisGameException();
    }
    const foundReservation = await this.reservationRepository.findByGameIdAndUserId(foundGame.id, command.user.id);
    if (foundReservation.length === 0) {
      throw new YouCantReviewAGameThatYouNeverReservedException();
    }
    const review = new Review();
    review.rating = command.rating;
    review.title = command.title;
    review.comment = command.comment;
    review.createdAt = new Date();
    review.game = foundGame;
    review.user = command.user;

    await this.reviewRepository.saveOrUpdate(review);
  }
}
