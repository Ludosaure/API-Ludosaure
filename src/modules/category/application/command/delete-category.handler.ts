import {CommandHandler} from "@nestjs/cqrs";
import {DeleteCategoryCommand} from "./delete-category.command";
import {CategoryEntityRepository} from "../../category-entity.repository";
import {CategoryNotFoundException} from "../../../../shared/exceptions/category-not-found.exception";

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler {
    constructor(private readonly categoryRepository: CategoryEntityRepository) {
    }

    async execute(command: DeleteCategoryCommand): Promise<void> {
        const foundCategory = await this.categoryRepository.findOneBy({id: command.id});
        if (foundCategory == null) {
            throw new CategoryNotFoundException();
        }
        await this.categoryRepository.delete(foundCategory);
    }
}
