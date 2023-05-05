import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetFavoriteByUserResponseDto } from "./dto/response/get-favorite-by-user-response.dto";
import { GetFavoriteByUserRequestDto } from "./dto/request/get-favorite-by-user-request.dto";
import { GetFavoriteByGameRequestDto } from "./dto/request/get-favorite-by-game-request.dto";
import { CreateFavoriteRequestDto } from "./dto/request/create-favorite-request.dto";
import { DeleteFavoriteRequestDto } from "./dto/request/delete-favorite-request.dto";
import { GetFavoriteByGameResponseDto } from "./dto/response/get-favorite-by-game-response.dto";
import { GetFavoriteByUserQuery } from "./application/query/get-favorite-by-user.query";
import { GetFavoriteByGameQuery } from "./application/query/get-favorite-by-game.query";
import { CreateFavoriteCommand } from "./application/command/create-favorite.command";
import { DeleteFavoriteCommand } from "./application/command/delete-favorite.command";

@ApiTags("Favorite")
@Controller("favorite")
@ApiBearerAuth()
export class FavoriteController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get("/user/:userId")
  async getAllFavoriteGamesByUserId(@Param() getFavoriteByUserRequest: GetFavoriteByUserRequestDto) {
    return await this.queryBus.execute<GetFavoriteByUserQuery, GetFavoriteByUserResponseDto>
                    (GetFavoriteByUserQuery.of(getFavoriteByUserRequest));
  }

  @Get("/game/:gameId")
  async getAllFavoriteUsersByGameId(@Param() getFavoriteByGameRequest: GetFavoriteByGameRequestDto) {
    return await this.queryBus.execute<GetFavoriteByGameQuery, GetFavoriteByGameResponseDto>
                    (GetFavoriteByGameQuery.of(getFavoriteByGameRequest));
  }

  @Post("/:gameId")
  async createFavorite(@Param() createFavoriteRequest: CreateFavoriteRequestDto, @Req() request) {
    const user = request.user;
    return await this.commandBus.execute<CreateFavoriteCommand>
                    (CreateFavoriteCommand.of(createFavoriteRequest.gameId, user));
  }

  @Delete("/:gameId")
  async deleteFavorite(@Param() deleteFavoriteRequest: DeleteFavoriteRequestDto, @Req() request) {
    const user = request.user;
    return await this.commandBus.execute<DeleteFavoriteCommand>
                    (DeleteFavoriteCommand.of(deleteFavoriteRequest.gameId, user));
  }
}
