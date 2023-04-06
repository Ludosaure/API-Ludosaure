import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserGameReview} from "../../domain/model/user-game-review.entity";
import {Review} from "../../domain/model/review.entity";
import {Game} from "../../domain/model/game.entity";
import {User} from "../../domain/model/user.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserGameReview, User, Game, Review]),
    ],
})
export class UserGameReviewModule {
}
