import {Game} from "../../../../domain/model/game.entity";

export class GetGameByIdResponseDto {
    readonly game: Game;
    readonly canReviewGame: boolean;

    constructor(game: Game, canReview: boolean) {
        this.game = game;
        this.canReviewGame = canReview;
    }

}
