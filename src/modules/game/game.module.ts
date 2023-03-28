import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "../../infrastructure/model/game.entity";
import {GameController} from "./game.controller";
import {GameEntityRepository} from "./game-entity.repository";
import {GetAllGamesHandler} from "./application/query/get-all-games.handler";
import {Category} from "../../infrastructure/model/category.entity";
import {CreateGameHandler} from "./application/command/create-game.handler";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Game, Category]),
    ],
    controllers: [GameController],
    providers: [
        GameEntityRepository,
        GetAllGamesHandler,
        CreateGameHandler,
    ],
})
export class GameModule {}
