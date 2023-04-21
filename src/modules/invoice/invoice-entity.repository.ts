import {Repository} from "typeorm";
import {Invoice} from "../../domain/model/invoice.entity";
import {InvoiceRepository} from "../../infrastructure/invoice.repository";

export class InvoiceEntityRepository extends Repository<Invoice> implements InvoiceRepository {
    findAll(): Promise<Invoice[]> {
        return this.find();
    }

    findById(invoiceId: string): Promise<Invoice> {
        return this.findOneBy({id: invoiceId});
    }

    findByUserId(userId: string): Promise<Invoice[]> {
        return this.findBy({
            reservation: {
                user: {
                    id: userId
                }
            }
        });
    }

    async saveInvoice(invoice: Invoice): Promise<void> {
        await this.save(invoice);
    }

}
