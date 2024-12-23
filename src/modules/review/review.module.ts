import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "../../domain/model/review.entity";
import { ReviewEntityRepository } from "./review-entity.repository";
import { Game } from "../../domain/model/game.entity";
import { User } from "../../domain/model/user.entity";
import { ReviewController } from "./review.controller";
import { GetReviewByIdHandler } from "./application/query/get-review-by-id.handler";
import { GetReviewByGameIdHandler } from "./application/query/get-review-by-game-id.handler";
import { CreateReviewHandler } from "./application/command/create-review.handler";
import { DeleteReviewHandler } from "./application/command/delete-review.handler";
import { GameEntityRepository } from "../game/game-entity.repository";
import { UpdateReviewHandler } from "./application/command/update-review.handler";
import { ReservationEntityRepository } from "../reservation/reservation-entity.repository";
import { Reservation } from "../../domain/model/reservation.entity";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Review, Game, User, Reservation])
  ],
  controllers: [ReviewController],
  providers: [
    ReviewEntityRepository,
    GameEntityRepository,
    ReservationEntityRepository,
    GetReviewByIdHandler,
    GetReviewByGameIdHandler,
    CreateReviewHandler,
    UpdateReviewHandler,
    DeleteReviewHandler
  ]
})
export class ReviewModule {
}
