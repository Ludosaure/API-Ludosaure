import {Game} from "../../../../infrastructure/model/game.entity";

export class GetAllGamesResponseDTO {
    readonly games: Game[];

    constructor(games: Game[]) {
        this.games = games;
    }

}
