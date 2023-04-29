import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Invoice} from "../../domain/model/invoice.entity";
import {Reservation} from "../../domain/model/reservation.entity";
import InvoiceService from "./invoice.service";
import {InvoiceEntityRepository} from "./invoice-entity.repository";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Invoice, Reservation]),
    ],
    providers: [
        InvoiceEntityRepository,
        InvoiceService,
    ],
})
export class InvoiceModule {
}
