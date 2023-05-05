import { QueryHandler } from "@nestjs/cqrs";
import { GetFavoriteByGameQuery } from "./get-favorite-by-game.query";
import { GetFavoriteByGameResponseDto } from "../../dto/response/get-favorite-by-game-response.dto";
import { FavoriteRepository } from "../../../../infrastructure/favorite.repository";

@QueryHandler(GetFavoriteByGameQuery)
export class GetFavoriteByGameHandler {
  constructor(private readonly favoriteRepository: FavoriteRepository) {
  }

  async execute(query: GetFavoriteByGameQuery): Promise<GetFavoriteByGameResponseDto> {
    const favoriteGames = await this.favoriteRepository.findByGameId(query.gameId);
    return new GetFavoriteByGameResponseDto(favoriteGames);
  }
}
