import {CommandHandler} from "@nestjs/cqrs";
import {CreateCategoryCommand} from "./create-category.command";
import {CategoryEntityRepository} from "../../category-entity.repository";
import {Category} from "../../../../domain/model/category.entity";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler {

    constructor(private readonly categoryRepository: CategoryEntityRepository) {
    }

    async execute(command: CreateCategoryCommand): Promise<void> {
        const category = new Category();
        category.name = command.name;
        await this.categoryRepository.saveOrUpdate(category);
    }
}
