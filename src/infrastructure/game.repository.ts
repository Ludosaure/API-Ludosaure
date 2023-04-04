import {Game} from "../domain/model/game.entity";

export interface GameRepository {

    findAll(): Promise<Game[]>;

    findById(gameId: string): Promise<Game>;

    findByName(name: string): Promise<Game[]>;

    saveOrUpdate(game: Game): Promise<void>;

    deleteGame(game: Game): Promise<void>;
}
