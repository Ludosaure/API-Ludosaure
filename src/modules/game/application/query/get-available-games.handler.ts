import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { GameEntityRepository } from "../../game-entity.repository";
import { GetAvailableGamesQuery } from "./get-available-games.query";
import { GetAvailableGamesResponseDto } from "../../dto/response/get-available-games-response.dto";
import { ReviewEntityRepository } from "../../../review/review-entity.repository";

@QueryHandler(GetAvailableGamesQuery)
export class GetAvailableGamesHandler implements ICommandHandler<GetAvailableGamesQuery> {

  constructor(private readonly gameRepository: GameEntityRepository,
              private readonly reviewRepository: ReviewEntityRepository) {
  }

  async execute(): Promise<GetAvailableGamesResponseDto> {
    const games = await this.gameRepository.findAllWithReservations();
    const availableGames = [];
    let isAvailable;
    for (const game of games) {
      isAvailable = true;
      if (game.reservations != null) {
        for (const reservation of game.reservations) {
          if (
            reservation.isPaid &&
            !reservation.isCancelled &&
            !reservation.isReturned
          ) {
            isAvailable = false;
            break;
          }
        }
      }
      if (isAvailable)
        availableGames.push(game);
    }

    for (const game of availableGames) {
      game.averageRating = await this.reviewRepository.findAverageRatingByGameId(game.id);
    }
    return new GetAvailableGamesResponseDto(availableGames);
  }
}
