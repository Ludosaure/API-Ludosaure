import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateFaqCommand} from "./create-faq.command";
import {Faq} from "../../../../domain/model/faq.entity";
import {FaqEntityRepository} from "../../faq-entity.repository";

@CommandHandler(CreateFaqCommand)
export class CreateFaqHandler implements ICommandHandler<CreateFaqCommand> {
    constructor(private readonly faqRepository: FaqEntityRepository) {
    }

    async execute(command: CreateFaqCommand) {
        const faq = new Faq();
        faq.question = command.question;
        faq.answer = command.answer;
        return await this.faqRepository.saveOrUpdate(faq);
    }
}
