import { GetFavoriteByGameRequestDto } from "../../dto/request/get-favorite-by-game-request.dto";

export class GetFavoriteByGameQuery {
  gameId: string;

  private constructor(gameId: string) {
    this.gameId = gameId;
  }

  static of(getFavoriteByGameRequestDto: GetFavoriteByGameRequestDto): GetFavoriteByGameQuery {
    const { gameId } = getFavoriteByGameRequestDto;
    return new GetFavoriteByGameQuery(gameId);
  }
}
