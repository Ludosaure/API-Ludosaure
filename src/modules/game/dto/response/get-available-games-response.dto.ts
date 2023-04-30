import {Game} from "../../../../domain/model/game.entity";

export class GetAvailableGamesResponseDto {
    readonly games: Game[];

    constructor(games: Game[]) {
        this.games = games;
    }

}
