import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Category} from "../../infrastructure/model/category.entity";
import {CategoryRepository} from "../../domain/category.repository";
import {InjectRepository} from "@nestjs/typeorm";

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
}
