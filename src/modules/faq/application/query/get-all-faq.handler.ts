import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllFaqQuery} from "./get-all-faq.query";
import {FaqEntityRepository} from "../../faq-entity.repository";

@QueryHandler(GetAllFaqQuery)
export class GetAllFaqHandler implements IQueryHandler<GetAllFaqQuery> {
    constructor(private readonly faqRepository: FaqEntityRepository) {
    }

    async execute() {
        return await this.faqRepository.findAll();
    }
}
