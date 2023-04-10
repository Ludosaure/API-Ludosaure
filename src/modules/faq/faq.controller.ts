import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, InternalServerErrorException, Post, UseGuards} from "@nestjs/common";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Roles} from "../../shared/roles.decorator";
import {Role} from "../../domain/model/enum/role";
import {FaqNotFoundException} from "./exceptions/faq-not-found.exception";
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
@UseGuards(JwtAuthGuard, RolesGuard)
export class FaqController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Roles(Role.ADMIN, Role.CLIENT)
    @Get()
    async getAll() {
        try {
            return await this.queryBus.execute<GetAllFaqQuery, GetAllFaqResponseDto>(GetAllFaqQuery.of());
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Roles(Role.ADMIN)
    @Post('/create')
    async createFaq(@Body() createFaqRequest: CreateFaqRequestDto) {
        try {
            return await this.commandBus.execute<CreateFaqCommand>(CreateFaqCommand.of(createFaqRequest));
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Roles(Role.ADMIN)
    @Post('/update')
    async updateFaq(@Body() updateFaqRequest: UpdateFaqRequestDto) {
        try {
            return await this.commandBus.execute<UpdateFaqCommand>(UpdateFaqCommand.of(updateFaqRequest));
        } catch (error) {
            if (error instanceof FaqNotFoundException) {
                throw new FaqNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    @Roles(Role.ADMIN)
    @Delete('/delete')
    async deleteFaq(@Body() deleteFaqRequest: DeleteFaqRequestDto) {
        try {
            return await this.commandBus.execute<DeleteFaqCommand>(DeleteFaqCommand.of(deleteFaqRequest));
        } catch (error) {
            if (error instanceof FaqNotFoundException) {
                throw new FaqNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }
}
