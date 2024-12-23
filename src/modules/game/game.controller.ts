import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { Roles } from '../../shared/roles.decorator';
import { Role } from '../../domain/model/enum/role';
import { GetAllGamesResponseDto } from './dto/response/get-all-games-response.dto';
import { GetAllGamesQuery } from './application/query/get-all-games.query';
import { CreateGameCommand } from './application/command/create-game.command';
import { CreateGameRequestDto } from './dto/request/create-game-request.dto';
import { UpdateGameRequestDto } from './dto/request/update-game-request.dto';
import { UpdateGameCommand } from './application/command/update-game.command';
import { GetGameByIdResponseDto } from './dto/response/get-game-by-id-response.dto';
import { GetGameByIdQuery } from './application/query/get-game-by-id.query';
import { GetGamesByNameQuery } from './application/query/get-games-by-name.query';
import { GetGamesByNameResponseDto } from './dto/response/get-games-by-name-response.dto';
import { GetAvailableGamesResponseDto } from './dto/response/get-available-games-response.dto';
import { GetAvailableGamesQuery } from './application/query/get-available-games.query';
import { GetGameByIdRequestDto } from './dto/request/get-game-by-id-request.dto';
import { GetGamesByNameRequestDto } from './dto/request/get-games-by-name-request.dto';
import { DeleteGameRequestDto } from './dto/request/delete-game-request-dto';
import { DeleteGameCommand } from './application/command/delete-game-command';
import { User } from '../../domain/model/user.entity';

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
    return await this.queryBus.execute<
      GetAllGamesQuery,
      GetAllGamesResponseDto
    >(GetAllGamesQuery.of());
  }

  @Get('/availables')
  async getAvailableGames(): Promise<GetAvailableGamesResponseDto> {
    return await this.queryBus.execute<
      GetAvailableGamesQuery,
      GetAvailableGamesResponseDto
    >(GetAvailableGamesQuery.of());
  }

  @Get('/id/:id')
  async getGameById(@Param() getGameByIdRequest: GetGameByIdRequestDto) {
    return await this.queryBus.execute<
      GetGameByIdQuery,
      GetGameByIdResponseDto
    >(GetGameByIdQuery.of(getGameByIdRequest, null));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLIENT)
  @Get('/id/:id/logged-user')
  async getGameByIdForLoggedUser(@Param() getGameByIdRequest: GetGameByIdRequestDto, @Req() request) {
    const user: User = request.user;

    return await this.queryBus.execute<
      GetGameByIdQuery,
      GetGameByIdResponseDto
    >(GetGameByIdQuery.of(getGameByIdRequest, user));
  }

  @Get('/name/:name')
  async getGameByName(@Param() getGameByNameRequest: GetGamesByNameRequestDto) {
    return await this.queryBus.execute<
      GetGamesByNameQuery,
      GetGamesByNameResponseDto
    >(GetGamesByNameQuery.of(getGameByNameRequest));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createGame(@Body() createGameRequest: CreateGameRequestDto) {
    return await this.commandBus.execute<CreateGameCommand>(
      CreateGameCommand.of(createGameRequest),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put()
  async updateGame(@Body() updateGameRequest: UpdateGameRequestDto) {
    return await this.commandBus.execute<UpdateGameCommand>(
      UpdateGameCommand.of(updateGameRequest),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/:gameId')
  async delete(@Param() deleteGameRequest: DeleteGameRequestDto) {
    return await this.commandBus.execute<DeleteGameCommand>(
      DeleteGameCommand.of(deleteGameRequest),
    );
  }
}
