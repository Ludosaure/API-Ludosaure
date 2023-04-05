import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Category} from "../../domain/model/category.entity";
import {CategoryRepository} from "../../infrastructure/category.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Game} from "../../domain/model/game.entity";

@Injectable()
export class CategoryEntityRepository extends Repository<Category> implements CategoryRepository {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {
        super(
            categoryRepository.target,
            categoryRepository.manager,
            categoryRepository.queryRunner,
        );
    }

    findById(categoryId: string): Promise<Category> {
        return this.findOneBy({id: categoryId});
    }

    async findByName(name: string): Promise<Category> {
        return await this.manager
            .createQueryBuilder(Category, 'category')
            .select('*')
            .where(
                'UPPER(category.name) = UPPER(:name)',
                {
                    name: name,
                },
            )
            .getRawOne();
    }

    findAll(): Promise<Category[]> {
        return this.find();
    }

    async saveOrUpdate(category: Category): Promise<void> {
        await this.save(category);
    }

    async deleteCategory(categoryId: string): Promise<void> {
        await this.delete(categoryId);
    }
}
