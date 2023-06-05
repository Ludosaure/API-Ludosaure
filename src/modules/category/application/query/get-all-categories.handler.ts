import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllCategoriesQuery} from "./get-all-categories.query";
import {CategoryEntityRepository} from "../../category-entity.repository";
import {GetAllCategoriesResponseDto} from "../../dto/response/get-all-categories-response.dto";

@QueryHandler(GetAllCategoriesQuery)
export class GetAllCategoriesHandler implements IQueryHandler<GetAllCategoriesQuery> {
    constructor(private readonly categoryRepository: CategoryEntityRepository) {
    }

    async execute(): Promise<GetAllCategoriesResponseDto> {
        const categories = await this.categoryRepository.findAll();
        return new GetAllCategoriesResponseDto(categories);
    }
}
