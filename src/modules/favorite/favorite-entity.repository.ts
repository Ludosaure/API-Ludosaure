import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FavoriteGame } from "../../domain/model/favorite-game.entity";
import { FavoriteRepository } from "../../infrastructure/favorite.repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FavoriteEntityRepository extends Repository<FavoriteGame> implements FavoriteRepository {
  constructor(@InjectRepository(FavoriteGame)
              private favoriteRepository: Repository<FavoriteGame>) {
    super(favoriteRepository.target,
      favoriteRepository.manager,
      favoriteRepository.queryRunner);
  }

  async findByUserId(userId: string): Promise<FavoriteGame[]> {
    return await this.find({
      where: {
        userId: userId
      },
      relations: ["game", "game.picture", "game.category"]
    });
  }

  async findByGameId(gameId: string): Promise<FavoriteGame[]> {
    return await this.find({
      where: {
        gameId: gameId
      },
      relations: {
        user: true,
        game: true,
      }
    });
  }

  async findByUserIdAndGameId(userId: string, gameId: string): Promise<FavoriteGame> {
    return await this.findOne({
      where: {
        userId: userId,
        gameId: gameId
      }
    });
  }

  async saveOrUpdate(favoriteGame: FavoriteGame): Promise<void> {
    await this.save(favoriteGame);
  }

  async deleteFavoriteGameByUserIdAndGameId(userId: string, gameId: string): Promise<void> {
    await this.delete({
      userId: userId,
      gameId: gameId
    });
  }
}
