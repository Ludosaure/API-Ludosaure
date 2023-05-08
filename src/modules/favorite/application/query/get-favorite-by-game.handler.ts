import { QueryHandler } from "@nestjs/cqrs";
import { GetFavoriteByGameQuery } from "./get-favorite-by-game.query";
import { GetFavoriteByGameResponseDto } from "../../dto/response/get-favorite-by-game-response.dto";
import { FavoriteEntityRepository } from "../../favorite-entity.repository";

@QueryHandler(GetFavoriteByGameQuery)
export class GetFavoriteByGameHandler {
  constructor(private readonly favoriteRepository: FavoriteEntityRepository) {
  }

  async execute(query: GetFavoriteByGameQuery): Promise<GetFavoriteByGameResponseDto> {
    const favoriteGames = await this.favoriteRepository.findByGameId(query.gameId);
    return new GetFavoriteByGameResponseDto(favoriteGames);
  }
}
