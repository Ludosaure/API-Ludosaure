import {Repository} from "typeorm";
import {Invoice} from "../../domain/model/invoice.entity";
import {InvoiceRepository} from "../../infrastructure/invoice.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class InvoiceEntityRepository extends Repository<Invoice> implements InvoiceRepository {

    constructor(@InjectRepository(Invoice)
                private invoiceRepository: Repository<Invoice>) {
        super(invoiceRepository.target, invoiceRepository.manager, invoiceRepository.queryRunner);
    }

    findAll(): Promise<Invoice[]> {
        return this.find();
    }

    findById(invoiceId: string): Promise<Invoice> {
        return this.findOneBy({id: invoiceId});
    }

    findByReservationId(reservationId: string): Promise<Invoice[]> {
        return this.findBy({
            reservation: {
                id: reservationId
            }
        });
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
