import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {BadRequestException, Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {Roles} from "../../shared/roles.decorator";
import {Role} from "../../infrastructure/model/enum/role";
import {GetAllGamesResponseDTO} from "./dto/response/get-all-games-response.dto";
import {GetAllGamesQuery} from "./application/query/get-all-games.query";
import {CreateGameCommand} from "./application/command/create-game.command";
import {CreateGameRequestDTO} from "./dto/request/create-game-request.dto";
import {UserNotFoundException} from "../../shared/exceptions/user-not-found.exception";
import {CategoryNotFoundException} from "../../shared/exceptions/category-not-found.exception";

@ApiTags('Game')
@Controller('game')
export class GameController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Get('/all')
    async getAllGames(): Promise<GetAllGamesResponseDTO> {
        try {
            return await this.queryBus.execute<
                GetAllGamesQuery,
                GetAllGamesResponseDTO
            >(GetAllGamesQuery.of());
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('/create')
    async createGame(@Body() createGameRequest: CreateGameRequestDTO){
        try {
            return await this.commandBus.execute<CreateGameCommand, void>(
                CreateGameCommand.of(createGameRequest),
            );
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
