import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Invoice } from "../../../../domain/model/invoice.entity";

export class GetInvoicesByUserIdResponseDto {
    invoices: Invoice[];
    constructor(invoices: Invoice[]) {
        this.invoices = invoices;
    }
}
