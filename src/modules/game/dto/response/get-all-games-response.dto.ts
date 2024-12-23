import {Game} from "../../../../domain/model/game.entity";

export class GetAllGamesResponseDto {
    readonly games: Game[];

    constructor(games: Game[]) {
        this.games = games;
    }

}
