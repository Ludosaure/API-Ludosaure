import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Post, Put, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {Role} from "../../domain/model/enum/role";
import {Roles} from "../../shared/roles.decorator";
import {CreateCategoryRequestDto} from "./dto/request/create-category-request.dto";
import {CreateCategoryCommand} from "./application/command/create-category.command";
import {UpdateCategoryRequestDto} from "./dto/request/update-category-request.dto";
import {GetAllCategoriesResponseDto} from "./dto/response/get-all-categories-response.dto";
import {DeleteCategoryRequestDto} from "./dto/request/delete-category-request.dto";
import {UpdateCategoryCommand} from "./application/command/update-category.command";
import {DeleteCategoryCommand} from "./application/command/delete-category.command";
import {GetAllCategoriesQuery} from "./application/query/get-all-categories.query";

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Get()
    async getAllCategories() {
        return await this.queryBus.execute<GetAllCategoriesQuery, GetAllCategoriesResponseDto>(GetAllCategoriesQuery.of());
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    async createCategory(@Body() createCategoryRequest: CreateCategoryRequestDto) {
        return await this.commandBus.execute<CreateCategoryCommand>(CreateCategoryCommand.of(createCategoryRequest));
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put()
    async updateCategory(@Body() updateCategoryRequest: UpdateCategoryRequestDto) {
        return await this.commandBus.execute<UpdateCategoryCommand>(UpdateCategoryCommand.of(updateCategoryRequest));
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete()
    async deleteCategory(@Body() deleteCategoryRequest: DeleteCategoryRequestDto) {
        return await this.commandBus.execute<DeleteCategoryCommand>(DeleteCategoryCommand.of(deleteCategoryRequest));
    }
}
