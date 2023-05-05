import { QueryHandler } from "@nestjs/cqrs";
import { FavoriteRepository } from "../../../../infrastructure/favorite.repository";
import { DeleteFavoriteCommand } from "./delete-favorite.command";

@QueryHandler(DeleteFavoriteCommand)
export class DeleteFavoriteHandler {
  constructor(private readonly favoriteRepository: FavoriteRepository) {
  }

  async execute(query: DeleteFavoriteCommand) {
    const { gameId, userId } = query;
    return await this.favoriteRepository.deleteFavoriteGameByUserIdAndGameId(userId, gameId);
  }
}
