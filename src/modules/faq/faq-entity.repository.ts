import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Faq} from "../../domain/model/faq.entity";
import {FaqRepository} from "../../infrastructure/faq.repository";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class FaqEntityRepository extends Repository<Faq> implements FaqRepository {
    constructor(@InjectRepository(Faq)
                private faqRepository: Repository<Faq>) {
        super(faqRepository.target,
            faqRepository.manager,
            faqRepository.queryRunner);
    }

    async findAll(): Promise<Faq[]> {
        return await this.find();
    }

    findById(id: string): Promise<Faq> {
        return this.findOneBy({id: id});
    }

    async saveOrUpdate(faq: Faq): Promise<void> {
        await this.save(faq);
    }

    async deleteFaq(faq: Faq): Promise<void> {
        await this.delete(faq);
    }
}
