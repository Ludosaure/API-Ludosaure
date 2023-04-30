import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { GameEntityRepository } from "../../game-entity.repository";
import { GetAvailableGamesQuery } from "./get-available-games.query";
import { GetAvailableGamesResponseDto } from "../../dto/response/get-available-games-response.dto";

@QueryHandler(GetAvailableGamesQuery)
export class GetAvailableGamesHandler implements ICommandHandler<GetAvailableGamesQuery> {

  constructor(private readonly gameRepository: GameEntityRepository) {
  }

  async execute(): Promise<GetAvailableGamesResponseDto> {
    const games = await this.gameRepository.findAllWithReservations();
    const availableGames = [];
    let isAvailable;
    for (const game of games) {
      isAvailable = true;
      if (game.reservations != null) {
        for (const reservation of game.reservations) {
          if (reservation.endDate > new Date() && reservation.isPaid && !reservation.isCancelled && !reservation.isReturned) {
            isAvailable = false;
            break;
          }
        }
      }
      if (isAvailable)
        availableGames.push(game);
    }
    return new GetAvailableGamesResponseDto(availableGames);
  }
}
