import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {BadRequestException, Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {Role} from "../../infrastructure/model/enum/role";
import {Roles} from "../../shared/roles.decorator";
import {CategoryNotFoundException} from "../../shared/exceptions/category-not-found.exception";
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

    @Get('/all')
    async getAllCategories() {
        try {
            return await this.queryBus.execute<GetAllCategoriesQuery, GetAllCategoriesResponseDto>(GetAllCategoriesQuery.of());
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('/create')
    async createCategory(@Body() createCategoryRequest: CreateCategoryRequestDto) {
        try {
            return await this.commandBus.execute<CreateCategoryCommand, void>(CreateCategoryCommand.of(createCategoryRequest));
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('/update')
    async updateCategory(@Body() updateCategoryRequest: UpdateCategoryRequestDto) {
        try {
            return await this.commandBus.execute<UpdateCategoryCommand, void>(UpdateCategoryCommand.of(updateCategoryRequest));
        } catch (error) {
            if (error instanceof CategoryNotFoundException) {
                throw new CategoryNotFoundException();
            } else {
                console.error(error);
                throw new BadRequestException();
            }
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('/delete')
    async deleteCategory(@Body() deleteCategoryRequest: DeleteCategoryRequestDto) {
        try {
            return await this.commandBus.execute<DeleteCategoryCommand, void>(DeleteCategoryCommand.of(deleteCategoryRequest));
        } catch (error) {
            if (error instanceof CategoryNotFoundException) {
                throw new CategoryNotFoundException();
            } else {
                console.error(error);
                throw new BadRequestException();
            }
        }
    }
}
