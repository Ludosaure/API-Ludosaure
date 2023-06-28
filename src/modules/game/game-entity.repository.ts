import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Game } from '../../domain/model/game.entity';
import { GameRepository } from '../../infrastructure/game.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GameEntityRepository
  extends Repository<Game>
  implements GameRepository
{
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {
    super(
      gameRepository.target,
      gameRepository.manager,
      gameRepository.queryRunner,
    );
  }

  findAll(): Promise<Game[]> {
    return this.find({
      where: {
        isArchived: false,
      },
      relations: {
        category: true,
        unavailabilities: true,
        reviews: true,
        picture: true,
        reservations: true,
      },
    });
  }

  findAllWithReservations(): Promise<Game[]> {
    return this.find({
      where: {
        isArchived: false,
      },
      relations: {
        category: true,
        unavailabilities: true,
        reviews: true,
        picture: true,
      },
    });
  }

  findById(gameId: string): Promise<Game> {
    return this.findOne({
      where: {
        id: gameId,
      },
      relations: {
        category: true,
        unavailabilities: true,
        reviews: true,
        picture: true,
        reservations: true,
      },
    });
  }

  userCanReviewGame(gameId: string, userId: string): Promise<boolean> {
    const query = this.manager
      .createQueryBuilder(Game, 'g')
      .select('COUNT(r.id) as reviews_nb, COUNT(res.id) as res_nb')
      .leftJoin('g.reservations', 'res', 'res.user_id = :userId', { userId })
      .leftJoin(
        'g.reviews',
        'r',
        'r.game_id = :gameId AND r.user_id = :userId',
        { gameId, userId },
      )
      .where('g.id = :gameId', { gameId })
      .andWhere('res.is_returned AND NOT res.is_cancelled AND res.is_paid');

    return query.getRawOne().then((result) => {
      return result.reviews_nb < 1 && result.res_nb > 0;
    });
  }

  findByName(name: string): Promise<Game[]> {
    return this.manager
      .createQueryBuilder(Game, 'game')
      .leftJoinAndSelect('game.category', 'category')
      .leftJoinAndSelect('game.reviews', 'reviews')
      .leftJoinAndSelect('game.picture', 'picture')
      .where('UPPER(game.name) LIKE UPPER(:name)', {
        name: `%${name}%`,
      })
      .andWhere('game.isArchived = false')
      .getMany();
  }

  async saveOrUpdate(game: Game): Promise<void> {
    await this.save(game);
  }

  async deleteGame(game: Game): Promise<void> {
    await this.remove(game);
  }
}
