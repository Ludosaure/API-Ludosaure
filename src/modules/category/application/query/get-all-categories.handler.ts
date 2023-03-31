import {CommandHandler} from "@nestjs/cqrs";
import {GetAllCategoriesQuery} from "./get-all-categories.query";
import {CategoryEntityRepository} from "../../category-entity.repository";
import {GetAllCategoriesResponseDto} from "../../dto/response/get-all-categories-response.dto";

@CommandHandler(GetAllCategoriesQuery)
export class GetAllCategoriesHandler {
    constructor(private readonly categoryRepository: CategoryEntityRepository) {
    }

    async execute(query: GetAllCategoriesQuery): Promise<GetAllCategoriesResponseDto> {
        const categories = await this.categoryRepository.findAll();
        return new GetAllCategoriesResponseDto(categories);
    }
}
