import {Game} from "../../../../domain/model/game.entity";

export class GetGameByIdResponseDto {
    readonly game: Game;

    constructor(game: Game) {
        this.game = game;
    }

}
