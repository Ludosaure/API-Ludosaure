import {Category} from "../../../../infrastructure/model/category.entity";

export class GetAllCategoriesResponseDto {
    readonly categories: Category[];

    constructor(categories: Category[]) {
        this.categories = categories;
    }
}
