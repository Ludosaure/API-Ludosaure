import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Reservation} from "../../domain/model/reservation.entity";
import {User} from "../../domain/model/user.entity";
import {Game} from "../../domain/model/game.entity";
import {Plan} from "../../domain/model/plan.entity";
import {ReservationController} from "./reservation.controller";
import {ReservationEntityRepository} from "./reservation-entity.repository";
import {UserEntityRepository} from "../user/user-entity.repository";
import {GameEntityRepository} from "../game/game-entity.repository";
import {GetAllGamesHandler} from "../game/application/query/get-all-games.handler";
import {GetReservationByIdHandler} from "./application/query/get-reservation-by-id.handler";
import {GetReservationByUserIdHandler} from "./application/query/get-reservation-by-user-id.handler";
import {CreateReservationHandler} from "./application/command/create-reservation.handler";
import {UpdateReservationHandler} from "./application/command/update-reservation.handler";
import {PlanEntityRepository} from "../plan/plan-entity.repository";
import InvoiceService from "../invoice/invoice.service";
import {InvoiceEntityRepository} from "../invoice/invoice-entity.repository";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Reservation, User, Plan, Game]),
    ],
    controllers: [ReservationController],
    providers: [
        InvoiceService,
        InvoiceEntityRepository,
        ReservationEntityRepository,
        UserEntityRepository,
        GameEntityRepository,
        PlanEntityRepository,
        GetAllGamesHandler,
        GetReservationByIdHandler,
        GetReservationByUserIdHandler,
        CreateReservationHandler,
        UpdateReservationHandler,
    ],
})
export class ReservationModule {}
