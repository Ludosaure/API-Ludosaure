import { Injectable } from "@nestjs/common";
import { GameAvailableAgainService } from "../email/game-available-again.service";
import { Game } from "../../domain/model/game.entity";
import { FavoriteEntityRepository } from "./favorite-entity.repository";

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteEntityRepository,
              private readonly gameAvailableAgainService: GameAvailableAgainService) {
  }

  async sendAvailableAgainEmailForFavoriteGame(game: Game) {
    const favorites = await this.favoriteRepository.findByGameId(game.id);
    favorites.forEach(favorite => {
      if (favorite.user.hasEnabledMailNotifications)
        this.gameAvailableAgainService.sendInformationMail(game, favorite.user);
    });
  }

}
