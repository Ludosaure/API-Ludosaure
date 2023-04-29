import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Roles} from "../../shared/roles.decorator";
import {Role} from "../../domain/model/enum/role";
import {UpdateFaqRequestDto} from "./dto/request/update-faq-request.dto";
import {CreateFaqRequestDto} from "./dto/request/create-faq-request.dto";
import {DeleteFaqRequestDto} from "./dto/request/delete-faq-request.dto";
import {GetAllFaqResponseDto} from "./dto/response/get-all-faq-response.dto";
import {GetAllFaqQuery} from "./application/query/get-all-faq.query";
import {CreateFaqCommand} from "./application/command/create-faq.command";
import {UpdateFaqCommand} from "./application/command/update-faq.command";
import {DeleteFaqCommand} from "./application/command/delete-faq.command";

@ApiTags('Faq')
@Controller('faq')
@ApiBearerAuth()
export class FaqController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Get()
    async getAll() {
        return await this.queryBus.execute<GetAllFaqQuery, GetAllFaqResponseDto>(GetAllFaqQuery.of());
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    async createFaq(@Body() createFaqRequest: CreateFaqRequestDto) {
        return await this.commandBus.execute<CreateFaqCommand>(CreateFaqCommand.of(createFaqRequest));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put()
    async updateFaq(@Body() updateFaqRequest: UpdateFaqRequestDto) {
        return await this.commandBus.execute<UpdateFaqCommand>(UpdateFaqCommand.of(updateFaqRequest));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete()
    async deleteFaq(@Body() deleteFaqRequest: DeleteFaqRequestDto) {
        return await this.commandBus.execute<DeleteFaqCommand>(DeleteFaqCommand.of(deleteFaqRequest));
    }
}
