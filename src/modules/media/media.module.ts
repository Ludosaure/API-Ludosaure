import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "../../domain/model/media.entity";
import { Game } from "../../domain/model/game.entity";
import { News } from "../../domain/model/news.entity";
import { MediaEntityRepository } from "./media-entity.repository";
import { MediaController } from "./media.controller";
import { CreateMediaHandler } from "./application/command/create-media.handler";
import { DeleteMediaHandler } from "./application/command/delete-media.handler";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Media, Game, News]),
    ],
    controllers: [MediaController],
    providers: [
      MediaEntityRepository,
      CreateMediaHandler,
      DeleteMediaHandler,
    ],
})
export class MediaModule {}
