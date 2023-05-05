import { QueryHandler } from "@nestjs/cqrs";
import { CreateFavoriteCommand } from "./create-favorite.command";
import { GameAlreadyInYourFavoritesException } from "../../exceptions/game-already-in-your-favorites.exception";
import { FavoriteGame } from "../../../../domain/model/favorite-game.entity";
import { FavoriteEntityRepository } from "../../favorite-entity.repository";

@QueryHandler(CreateFavoriteCommand)
export class CreateFavoriteHandler {
  constructor(private readonly favoriteRepository: FavoriteEntityRepository) {
  }

  async execute(query: CreateFavoriteCommand) {
    const { gameId, userId } = query;
    const foundFavorite = await this.favoriteRepository.findByUserIdAndGameId(userId, gameId);
    if (foundFavorite != null) {
      throw new GameAlreadyInYourFavoritesException();
    }
    const favorite = new FavoriteGame();
    favorite.gameId = gameId;
    favorite.userId = userId;
    return await this.favoriteRepository.saveOrUpdate(favorite);
  }
}
