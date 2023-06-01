import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Invoice } from "../../../../domain/model/invoice.entity";

export class GetInvoicesByReservationIdResponseDto {
    invoices: Invoice[];
    constructor(invoices: Invoice[]) {
        this.invoices = invoices;
    }
}
