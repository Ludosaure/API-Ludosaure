import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Game } from "../../domain/model/game.entity";
import { GameRepository } from "../../infrastructure/game.repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class GameEntityRepository extends Repository<Game> implements GameRepository {

  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>
  ) {
    super(
      gameRepository.target,
      gameRepository.manager,
      gameRepository.queryRunner
    );
  }

  findAll(): Promise<Game[]> {
    return this.find({
      where: {
        isArchived: false
      },
      relations: {
        category: true,
        unavailabilities: true
      }
    });
  }

  findAllWithReservations(): Promise<Game[]> {
    return this.find({
      where: {
        isArchived: false
      },
      relations: {
        reservations: true
      }
    });
  }

  findById(gameId: string): Promise<Game> {
    return this.findOneBy({ id: gameId });
  }

  findByName(name: string): Promise<Game[]> {
    return this.manager
      .createQueryBuilder(Game, "game")
      .select("*")
      .where(
        "UPPER(game.name) LIKE UPPER(:name)",
        {
          name: `%${name}%`
        }
      )
      .andWhere("game.isArchived = false")
      .getRawMany();
  }

  async saveOrUpdate(game: Game): Promise<void> {
    await this.save(game);
  }
}
