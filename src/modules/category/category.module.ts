import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "../../domain/model/category.entity";
import {CategoryEntityRepository} from "./category-entity.repository";
import {CreateCategoryHandler} from "./application/command/create-category.handler";
import {UpdateCategoryHandler} from "./application/command/update-category.handler";
import {DeleteCategoryHandler} from "./application/command/delete-category.handler";
import {GetAllCategoriesHandler} from "./application/query/get-all-categories.handler";
import {CategoryController} from "./category.controller";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Category]),
    ],
    controllers: [CategoryController],
    providers: [
        CategoryEntityRepository,
        CreateCategoryHandler,
        UpdateCategoryHandler,
        GetAllCategoriesHandler,
        DeleteCategoryHandler,
    ],
})
export class CategoryModule {
}
