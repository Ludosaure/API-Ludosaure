import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./user.entity";
import {Game} from "./game.entity";
import {Review} from "./review.entity";

@Entity()
export class UserGameReview {
    @PrimaryColumn({name: 'user_id'})
    userId: string;

    @PrimaryColumn({name: 'game_id'})
    gameId: string;

    @PrimaryColumn({name: 'review_id'})
    reviewId: string;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Game, (game) => game.id, {nullable: false})
    @JoinColumn({name: 'game_id'})
    game: Game;

    @ManyToOne(() => Review, (review) => review.id, {nullable: false})
    @JoinColumn({name: 'review_id'})
    review: Review;
}
