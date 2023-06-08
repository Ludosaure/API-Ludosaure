import {Repository} from "typeorm";
import {Invoice} from "../../domain/model/invoice.entity";
import {InvoiceRepository} from "../../infrastructure/invoice.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import { InvoiceGameRepository } from "../../infrastructure/invoice-game.repository";
import { InvoiceGame } from "../../domain/model/invoice-game.entity";

@Injectable()
export class InvoiceGameEntityRepository extends Repository<InvoiceGame> implements InvoiceGameRepository {

    constructor(@InjectRepository(InvoiceGame)
                private invoiceGameRepository: Repository<InvoiceGame>) {
        super(invoiceGameRepository.target, invoiceGameRepository.manager, invoiceGameRepository.queryRunner);
    }

    findByInvoiceId(invoiceId: string): Promise<InvoiceGame[]> {
        return this.find({
            where: {
                invoice: {
                    id: invoiceId,
                }
            }
        });
    }

    async saveInvoiceGame(invoiceGame: InvoiceGame): Promise<void> {
        await this.save(invoiceGame);
    }

}
