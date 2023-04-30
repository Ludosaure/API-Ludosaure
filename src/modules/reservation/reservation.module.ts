import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reservation } from "../../domain/model/reservation.entity";
import { User } from "../../domain/model/user.entity";
import { Game } from "../../domain/model/game.entity";
import { Plan } from "../../domain/model/plan.entity";
import { ReservationController } from "./reservation.controller";
import { ReservationEntityRepository } from "./reservation-entity.repository";
import { UserEntityRepository } from "../user/user-entity.repository";
import { GameEntityRepository } from "../game/game-entity.repository";
import { GetReservationByIdHandler } from "./application/query/get-reservation-by-id.handler";
import { GetReservationByUserIdHandler } from "./application/query/get-reservation-by-user-id.handler";
import { CreateReservationHandler } from "./application/command/create-reservation.handler";
import { UpdateReservationHandler } from "./application/command/update-reservation.handler";
import { PlanEntityRepository } from "../plan/plan-entity.repository";
import InvoiceService from "../invoice/invoice.service";
import { InvoiceEntityRepository } from "../invoice/invoice-entity.repository";
import { EmailReservationConfirmationService } from "../email/email-reservation-confirmation.service";
import EmailService from "../email/email.service";
import { GetAllReservationsHandler } from "./application/query/get-all-reservations.handler";
import { Invoice } from "../../domain/model/invoice.entity";
import { JwtStrategy } from "../authentication/strategy/jwt.strategy";
import { ReturnReservationHandler } from "./application/command/return-reservation.handler";
import { CancelReservationHandler } from "./application/command/cancel-reservation.handler";
import { EmailReservationCanceledService } from "../email/email-reservation-canceled.service";
import { EmailReservationReturnedService } from "../email/email-reservation-returned.service";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Reservation, User, Plan, Game, Invoice])
  ],
  controllers: [ReservationController],
  providers: [
    JwtStrategy,
    EmailReservationConfirmationService,
    EmailReservationCanceledService,
    EmailReservationReturnedService,
    EmailService,
    InvoiceService,
    InvoiceEntityRepository,
    ReservationEntityRepository,
    UserEntityRepository,
    GameEntityRepository,
    PlanEntityRepository,
    GetAllReservationsHandler,
    GetReservationByIdHandler,
    GetReservationByUserIdHandler,
    CreateReservationHandler,
    UpdateReservationHandler,
    ReturnReservationHandler,
    CancelReservationHandler
  ]
})
export class ReservationModule {
}
