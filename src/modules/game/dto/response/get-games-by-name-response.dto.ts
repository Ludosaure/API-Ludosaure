import {Game} from "../../../../infrastructure/model/game.entity";

export class GetGamesByNameResponseDto {
    readonly games: Game[];

    constructor(games: Game[]) {
        this.games = games;
    }

}
