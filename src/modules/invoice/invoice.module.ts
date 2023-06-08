import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "../../domain/model/invoice.entity";
import { Reservation } from "../../domain/model/reservation.entity";
import InvoiceService from "./invoice.service";
import { InvoiceController } from "./invoice.controller";
import { GenerateInvoiceHandler } from "./application/command/generate-invoice.handler";
import { GetAllInvoicesHandler } from "./application/query/get-all-invoices.handler";
import { GetInvoicesByReservationIdHandler } from "./application/query/get-invoices-by-reservation-id.handler";
import { GetInvoicesByUserIdHandler } from "./application/query/get-invoices-by-user-id.handler";
import { ReservationEntityRepository } from "../reservation/reservation-entity.repository";
import { InvoiceEntityRepository } from "./invoice-entity.repository";
import { InvoiceGameEntityRepository } from "../invoice-game/invoice-game-entity.repository";
import { InvoiceGame } from "../../domain/model/invoice-game.entity";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Invoice, Reservation, InvoiceGame])
  ],
  controllers: [InvoiceController],
  providers: [
    InvoiceEntityRepository,
    InvoiceGameEntityRepository,
    ReservationEntityRepository,
    InvoiceService,
    GenerateInvoiceHandler,
    GetAllInvoicesHandler,
    GetInvoicesByReservationIdHandler,
    GetInvoicesByUserIdHandler
  ]
})
export class InvoiceModule {
}
