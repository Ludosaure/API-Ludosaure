import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "../../domain/model/invoice.entity";
import { Reservation } from "../../domain/model/reservation.entity";
import InvoiceService from "./invoice.service";
import { InvoiceEntityRepository } from "./invoice-entity.repository";
import { InvoiceController } from "./invoice.controller";
import { GenerateInvoiceHandler } from "./application/command/generate-invoice.handler";
import { GetAllInvoicesHandler } from "./application/query/get-all-invoices.handler";
import { GetInvoicesByReservationIdHandler } from "./application/query/get-invoices-by-reservation-id.handler";
import { GetInvoicesByUserIdHandler } from "./application/query/get-invoices-by-user-id.handler";
import { ReservationEntityRepository } from "../reservation/reservation-entity.repository";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Invoice, Reservation])
  ],
  controllers: [InvoiceController],
  providers: [
    InvoiceEntityRepository,
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
