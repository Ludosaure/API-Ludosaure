import { QueryHandler } from "@nestjs/cqrs";
import { DeleteFavoriteCommand } from "./delete-favorite.command";
import { FavoriteEntityRepository } from "../../favorite-entity.repository";

@QueryHandler(DeleteFavoriteCommand)
export class DeleteFavoriteHandler {
  constructor(private readonly favoriteRepository: FavoriteEntityRepository) {
  }

  async execute(query: DeleteFavoriteCommand) {
    const { gameId, userId } = query;
    return await this.favoriteRepository.deleteFavoriteGameByUserIdAndGameId(userId, gameId);
  }
}
