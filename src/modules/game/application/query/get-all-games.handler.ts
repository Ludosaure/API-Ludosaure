import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllGamesQuery } from './get-all-games.query';
import { GameEntityRepository } from '../../game-entity.repository';
import { GetAllGamesResponseDto } from '../../dto/response/get-all-games-response.dto';
import { ReviewEntityRepository } from '../../../review/review-entity.repository';

@QueryHandler(GetAllGamesQuery)
export class GetAllGamesHandler implements ICommandHandler<GetAllGamesQuery> {
  constructor(
    private readonly gameRepository: GameEntityRepository,
    private readonly reviewRepository: ReviewEntityRepository,
  ) {}

  async execute(): Promise<GetAllGamesResponseDto> {
    const games = await this.gameRepository.findAll();

    for (const game of games) {
      game.isAvailable = true;
      if (game.reservations != null) {
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
      }
    }
    

    for (const game of games) {
      game.averageRating =
        await this.reviewRepository.findAverageRatingByGameId(game.id);
    }
    return new GetAllGamesResponseDto(games);
  }
}
