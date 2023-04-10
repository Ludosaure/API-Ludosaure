import {Faq} from "../domain/model/faq.entity";

export interface FaqRepository {
    findAll(): Promise<Faq[]>;
    findById(faqId: string): Promise<Faq>;
    saveOrUpdate(faq: Faq): Promise<void>;
    deleteFaq(faq: Faq): Promise<void>;
}
