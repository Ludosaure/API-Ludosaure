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
        return this.find({
            relations: {
                reservation: true,
            }
        });
    }

    findById(invoiceId: string): Promise<Invoice> {
        return this.findOne({
            where: {
                id: invoiceId,
            },
            relations: ["reservation", "reservation.user", "reservation.games"],
        });
    }

    findByReservationId(reservationId: string): Promise<Invoice[]> {
        return this.find({
            where: {
                reservation: {
                    id: reservationId,
                }
            },
            relations: {
                reservation: true,
            }
        })
    }

    findByUserId(userId: string): Promise<Invoice[]> {
        return this.find({
            where: {
                reservation: {
                    user: {
                        id: userId,
                    }
                }
            },
            relations: {
                reservation: true,
            }
        });
    }

    async saveInvoice(invoice: Invoice): Promise<void> {
        await this.save(invoice);
    }

}
