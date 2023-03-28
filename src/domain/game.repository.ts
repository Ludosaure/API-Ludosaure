import {Game} from "../infrastructure/model/game.entity";

export interface GameRepository {
    findById(gameId: string): Promise<Game>;

    saveOrUpdateGame(game: Game): Promise<void>;

    deleteGame(game: Game): Promise<void>;
}
