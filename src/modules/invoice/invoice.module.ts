import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Invoice} from "../../domain/model/invoice.entity";
import {Reservation} from "../../domain/model/reservation.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Invoice, Reservation]),
    ],
})
export class InvoiceModule {}
