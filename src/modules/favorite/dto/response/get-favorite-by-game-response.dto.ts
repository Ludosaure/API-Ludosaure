import { FavoriteGame } from "../../../../domain/model/favorite-game.entity";

export class GetFavoriteByGameResponseDto {
  favoriteGames: FavoriteGame[];

  constructor(favoriteGames: FavoriteGame[]) {
    this.favoriteGames = favoriteGames;
  }
}
