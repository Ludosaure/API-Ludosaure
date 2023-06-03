import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateFaqCommand} from "./update-faq.command";
import {FaqNotFoundException} from "../../exceptions/faq-not-found.exception";
import {FaqEntityRepository} from "../../faq-entity.repository";

@CommandHandler(UpdateFaqCommand)
export class UpdateFaqHandler implements ICommandHandler<UpdateFaqCommand> {
    constructor(private readonly faqRepository: FaqEntityRepository) {
    }

    async execute(command: UpdateFaqCommand) {
        const foundFaq = await this.faqRepository.findById(command.id);
        if (foundFaq == null) {
            throw new FaqNotFoundException();
        }
        if (command.question != null)
            foundFaq.question = command.question;
        if (command.answer != null)
            foundFaq.answer = command.answer;
        return await this.faqRepository.saveOrUpdate(foundFaq);
    }
}
