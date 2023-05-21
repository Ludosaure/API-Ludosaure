import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "../../domain/model/game.entity";
import { GameController } from "./game.controller";
import { GameEntityRepository } from "./game-entity.repository";
import { GetAllGamesHandler } from "./application/query/get-all-games.handler";
import { Category } from "../../domain/model/category.entity";
import { CreateGameHandler } from "./application/command/create-game.handler";
import { CategoryEntityRepository } from "../category/category-entity.repository";
import { UpdateGameHandler } from "./application/command/update-game.handler";
import { GetGameByIdHandler } from "./application/query/get-game-by-id.handler";
import { GetGamesByNameHandler } from "./application/query/get-games-by-name.handler";
import { FavoriteGame } from "../../domain/model/favorite-game.entity";
import { ReservationEntityRepository } from "../reservation/reservation-entity.repository";
import { Reservation } from "../../domain/model/reservation.entity";
import { GetAvailableGamesHandler } from "./application/query/get-available-games.handler";
import { Review } from "../../domain/model/review.entity";
import { ReviewEntityRepository } from "../review/review-entity.repository";
import { MediaEntityRepository } from "../media/media-entity.repository";
import { Media } from "../../domain/model/media.entity";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Game, Category, FavoriteGame, Reservation, Review, Media])
  ],
  controllers: [GameController],
  providers: [
    ReservationEntityRepository,
    CategoryEntityRepository,
    ReviewEntityRepository,
    GameEntityRepository,
    MediaEntityRepository,
    GetAllGamesHandler,
    GetAvailableGamesHandler,
    GetGameByIdHandler,
    GetGamesByNameHandler,
    CreateGameHandler,
    UpdateGameHandler
  ]
})
export class GameModule {
}
