import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InternalServerErrorException, Body, Controller, Get, Post, Query, UseGuards, Put} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {Roles} from "../../shared/roles.decorator";
import {Role} from "../../domain/model/enum/role";
import {GetAllGamesResponseDto} from "./dto/response/get-all-games-response.dto";
import {GetAllGamesQuery} from "./application/query/get-all-games.query";
import {CreateGameCommand} from "./application/command/create-game.command";
import {CreateGameRequestDto} from "./dto/request/create-game-request.dto";
import {CategoryNotFoundException} from "../../shared/exceptions/category-not-found.exception";
import {UpdateGameRequestDto} from "./dto/request/update-game-request.dto";
import {UpdateGameCommand} from "./application/command/update-game.command";
import {GameNotFoundException} from "../../shared/exceptions/game-not-found.exception";
import {DeleteGameRequestDto} from "./dto/request/delete-game-request.dto";
import {DeleteGameCommand} from "./application/command/delete-game.command";
import {GetGameByIdResponseDto} from "./dto/response/get-game-by-id-response.dto";
import {GetGameByIdRequestDto} from "./dto/request/get-game-by-id-request.dto";
import {GetGameByIdQuery} from "./application/query/get-game-by-id.query";
import {GetGamesByNameRequestDto} from "./dto/request/get-games-by-name-request.dto";
import {GetGamesByNameQuery} from "./application/query/get-games-by-name.query";
import {GetGamesByNameResponseDto} from "./dto/response/get-games-by-name-response.dto";

@ApiTags('Game')
@Controller('game')
export class GameController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Get()
    async getAllGames(): Promise<GetAllGamesResponseDto> {
        try {
            return await this.queryBus.execute<
                GetAllGamesQuery,
                GetAllGamesResponseDto
            >(GetAllGamesQuery.of());
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Get('/getById')
    async getGameById(@Query() getGameByIdRequest: GetGameByIdRequestDto) {
        try {
            return await this.queryBus.execute<
                GetGameByIdQuery,
                GetGameByIdResponseDto
            >(GetGameByIdQuery.of(getGameByIdRequest));
        } catch (error) {
            if (error instanceof GameNotFoundException) {
                throw new GameNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    @Get('/getByName')
    async getGameByName(@Query() getGameByNameRequest: GetGamesByNameRequestDto) {
        try {
            return await this.queryBus.execute<
                GetGamesByNameQuery,
                GetGamesByNameResponseDto
            >(GetGamesByNameQuery.of(getGameByNameRequest));
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('/create')
    async createGame(@Body() createGameRequest: CreateGameRequestDto) {
        try {
            return await this.commandBus.execute<CreateGameCommand>(
                CreateGameCommand.of(createGameRequest),
            );
        } catch (error) {
            if (error instanceof CategoryNotFoundException) {
                throw new CategoryNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put('/update')
    async updateGame(@Body() updateGameRequest: UpdateGameRequestDto) {
        try {
            return await this.commandBus.execute<UpdateGameCommand>(
                UpdateGameCommand.of(updateGameRequest),
            );
        } catch (error) {
            if (error instanceof CategoryNotFoundException) {
                throw new CategoryNotFoundException();
            } else if (error instanceof GameNotFoundException) {
                throw new GameNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('/delete')
    async deleteGame(@Body() deleteGameRequest: DeleteGameRequestDto) {
        try {
            return await this.commandBus.execute<DeleteGameCommand>(
                DeleteGameCommand.of(deleteGameRequest),
            );
        } catch (error) {
            if (error instanceof GameNotFoundException) {
                throw new GameNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }
}
