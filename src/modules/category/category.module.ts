import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "../../infrastructure/model/category.entity";
import {CategoryEntityRepository} from "./category-entity.repository";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Category]),
    ],
    // controllers: [CategoryController],
    providers: [
        CategoryEntityRepository,
    ],
})
export class CategoryModule {
}
