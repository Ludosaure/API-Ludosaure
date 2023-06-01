import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Invoice} from "../../domain/model/invoice.entity";
import {Reservation} from "../../domain/model/reservation.entity";
import InvoiceService from "./invoice.service";
import {InvoiceEntityRepository} from "./invoice-entity.repository";
import { InvoiceController } from "./invoice.controller";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Invoice, Reservation]),
    ],
    controllers: [InvoiceController],
    providers: [
        InvoiceEntityRepository,
        InvoiceService,
    ],
})
export class InvoiceModule {
}
