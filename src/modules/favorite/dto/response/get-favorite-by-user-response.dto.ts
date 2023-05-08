import { FavoriteGame } from "../../../../domain/model/favorite-game.entity";

export class GetFavoriteByUserResponseDto {
  favoriteGames: FavoriteGame[];

  constructor(favoriteGames: FavoriteGame[]) {
    this.favoriteGames = favoriteGames;
  }
}
