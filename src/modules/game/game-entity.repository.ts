import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Game} from "../../infrastructure/model/game.entity";
import {GameRepository} from "../../domain/game.repository";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class GameEntityRepository extends Repository<Game> implements GameRepository {

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

    findById(gameId: string): Promise<Game> {
        return this.findOneBy({id: gameId});
    }

    async saveOrUpdateGame(game: Game): Promise<void> {
        await this.save(game);
    }

    async deleteGame(game: Game): Promise<void> {
        await this.remove(game);
    }
}
