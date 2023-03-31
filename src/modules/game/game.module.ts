import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "../../infrastructure/model/game.entity";
import {GameController} from "./game.controller";
import {GameEntityRepository} from "./game-entity.repository";
import {GetAllGamesHandler} from "./application/query/get-all-games.handler";
import {Category} from "../../infrastructure/model/category.entity";
import {CreateGameHandler} from "./application/command/create-game.handler";
import {CategoryEntityRepository} from "../category/category-entity.repository";
import {UpdateGameHandler} from "./application/command/update-game.handler";
import {DeleteGameHandler} from "./application/command/delete-game.handler";
import {GetGameByIdHandler} from "./application/query/get-game-by-id.handler";
import {GetGamesByNameHandler} from "./application/query/get-games-by-name.handler";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Game, Category]),
    ],
    controllers: [GameController],
    providers: [
        CategoryEntityRepository,
        GameEntityRepository,
        GetAllGamesHandler,
        GetGameByIdHandler,
        GetGamesByNameHandler,
        CreateGameHandler,
        UpdateGameHandler,
        DeleteGameHandler,
    ],
})
export class GameModule {}
