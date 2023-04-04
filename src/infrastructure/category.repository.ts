import {Category} from "../domain/model/category.entity";

export interface CategoryRepository {
    findById(categoryId: string): Promise<Category>;

    findAll(): Promise<Category[]>;

    saveOrUpdate(category: Category): Promise<void>;

    deleteCategory(categoryId: string): Promise<void>;
}
