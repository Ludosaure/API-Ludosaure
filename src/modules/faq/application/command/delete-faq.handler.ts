import {CommandHandler} from "@nestjs/cqrs";
import {DeleteFaqCommand} from "./delete-faq.command";
import {FaqNotFoundException} from "../../exceptions/faq-not-found.exception";
import {FaqEntityRepository} from "../../faq-entity.repository";

@CommandHandler(DeleteFaqCommand)
export class DeleteFaqHandler {
    constructor(private readonly faqRepository: FaqEntityRepository) {
    }

    async execute(command: DeleteFaqCommand) {
        const foundFaq = await this.faqRepository.findById(command.id);
        if (foundFaq == null) {
            throw new FaqNotFoundException();
        }
        return await this.faqRepository.deleteFaq(foundFaq);
    }
}
