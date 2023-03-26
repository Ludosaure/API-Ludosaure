import {Game} from "../infrastructure/model/game.entity";

export interface GameRepository {
    findById(gameId: string): Promise<Game>;
}
