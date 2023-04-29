import {Invoice} from "../domain/model/invoice.entity";

export interface InvoiceRepository {
    findAll(): Promise<Invoice[]>;
    findById(invoiceId: string): Promise<Invoice>;
    findByReservationId(reservationId: string): Promise<Invoice[]>;
    findByUserId(userId: string): Promise<Invoice[]>;
    saveInvoice(invoice: Invoice): Promise<void>;
}
