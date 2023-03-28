import {Category} from "../infrastructure/model/category.entity";

export interface CategoryRepository {
    findById(categoryId: string): Promise<Category>;
}
