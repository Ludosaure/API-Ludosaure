import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GameEntityRepository } from '../../game-entity.repository';
import { GetGameByIdQuery } from './get-game-by-id.query';
import { GameNotFoundException } from '../../../../shared/exceptions/game-not-found.exception';
import { GetGameByIdResponseDto } from '../../dto/response/get-game-by-id-response.dto';
import { ReviewEntityRepository } from '../../../review/review-entity.repository';

@QueryHandler(GetGameByIdQuery)
export class GetGameByIdHandler implements ICommandHandler<GetGameByIdQuery> {
  constructor(
    private readonly gameRepository: GameEntityRepository,
    private readonly reviewRepository: ReviewEntityRepository,
  ) {}
  async execute(query: GetGameByIdQuery): Promise<GetGameByIdResponseDto> {
    const game = await this.gameRepository.findById(query.id);

    if (game == null) {
      throw new GameNotFoundException();
    }

    game.isAvailable = true;

    for (const reservation of game.reservations) {
      if (
        reservation.isPaid &&
        !reservation.isCancelled &&
        !reservation.isReturned
      ) {
        game.isAvailable = false;
        break;
      }
    }

    game.averageRating = await this.reviewRepository.findAverageRatingByGameId(
      game.id,
    );

    let canReview = false;
    if (query.user != null) {
      canReview = await this.gameRepository.userCanReviewGame(
        query.id,
        query.user.id,
      );
    }

    return new GetGameByIdResponseDto(game, canReview);
  }
}
