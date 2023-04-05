import {CommandHandler} from "@nestjs/cqrs";
import {CreateCategoryCommand} from "./create-category.command";
import {CategoryEntityRepository} from "../../category-entity.repository";
import {Category} from "../../../../domain/model/category.entity";
import {CategoryAlreadyExistsException} from "../../exceptions/category-already-exists.exception";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler {

    constructor(private readonly categoryRepository: CategoryEntityRepository) {
    }

    async execute(command: CreateCategoryCommand): Promise<void> {
        const foundCategory = await this.categoryRepository.findByName(command.name);
        if(foundCategory != null) {
            throw new CategoryAlreadyExistsException();
        }
        const category = new Category();
        category.name = command.name;
        await this.categoryRepository.saveOrUpdate(category);
    }
}
