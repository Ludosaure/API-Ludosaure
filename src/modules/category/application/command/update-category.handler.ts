import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateCategoryCommand} from "./update-category.command";
import {CategoryEntityRepository} from "../../category-entity.repository";
import {CategoryNotFoundException} from "../../../../shared/exceptions/category-not-found.exception";

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
    constructor(private readonly categoryRepository: CategoryEntityRepository) {
    }

    async execute(command: UpdateCategoryCommand): Promise<void> {
        const foundCategory = await this.categoryRepository.findOneBy({id: command.id});
        if (foundCategory == null) {
            throw new CategoryNotFoundException();
        }
        foundCategory.name = command.name;
        await this.categoryRepository.saveOrUpdate(foundCategory);
    }
}
