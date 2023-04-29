import {Injectable} from '@nestjs/common';
import {InvoiceEntityRepository} from "./invoice-entity.repository";
import {Invoice} from "../../domain/model/invoice.entity";
import {Reservation} from "../../domain/model/reservation.entity";

@Injectable()
export default class InvoiceService {

    constructor(private readonly invoiceRepository: InvoiceEntityRepository) {
    }

    async createInvoice(amount: number, reservation: Reservation) {
        const invoice = new Invoice();
        invoice.createdAt = new Date();
        invoice.amount = amount;
        invoice.reservation = reservation;
        await this.invoiceRepository.saveInvoice(invoice);
    }

    async getFacturedAmountForReservation(reservationId: string): Promise<number> {
        const invoices = await this.invoiceRepository.findByReservationId(reservationId);
        return invoices.reduce((facturedAmount, invoice) => facturedAmount + invoice.amount, 0);
    }
}
