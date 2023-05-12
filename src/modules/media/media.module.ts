import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "../../domain/model/media.entity";
import { Game } from "../../domain/model/game.entity";
import { News } from "../../domain/model/news.entity";
import { MediaService } from "./media.service";
import { MediaEntityRepository } from "./media-entity.repository";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Media, Game, News]),
    ],
    providers: [
      MediaService,
      MediaEntityRepository,
    ],
})
export class MediaModule {}
