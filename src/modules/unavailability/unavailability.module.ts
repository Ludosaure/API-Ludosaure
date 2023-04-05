import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Unavailability} from "../../domain/model/unavailability.entity";
import {Game} from "../../domain/model/game.entity";
import {UnavailabilityController} from "./unavailability.controller";
import {UnavailabilityEntityRepository} from "./unavailability-entity.repository";
import {GameEntityRepository} from "../game/game-entity.repository";
import {CreateUnavailabilityHandler} from "./application/command/create-unavailability.handler";
import {GetUnavailabilitiesByGameIdHandler} from "./application/query/get-unavailabilities-by-game-id.handler";
import {DeleteUnavailabilityHandler} from "./application/command/delete-unavailability.handler";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Unavailability, Game]),
    ],
    controllers: [UnavailabilityController],
    providers: [
        UnavailabilityEntityRepository,
        GameEntityRepository,
        GetUnavailabilitiesByGameIdHandler,
        CreateUnavailabilityHandler,
        DeleteUnavailabilityHandler,
    ],
})
export class UnavailabilityModule {}
