import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {BadRequestException, Controller, Get, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {Roles} from "../../shared/roles.decorator";
import {Role} from "../../infrastructure/model/enum/role";
import {GetAllGamesResponseDto} from "./dto/response/get-all-games-response.dto";
import {GetAllGamesQuery} from "./dto/request/get-all-games.query";

@ApiTags('Game')
@Controller('game')
export class GameController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.CLIENT)
    @Get('/all')
    async getAllGames(): Promise<GetAllGamesResponseDto> {
        try {
            return await this.queryBus.execute<
                GetAllGamesQuery,
                GetAllGamesResponseDto
            >(GetAllGamesQuery.of());
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }
}
