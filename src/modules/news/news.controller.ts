import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { Role } from "../../domain/model/enum/role";
import { Roles } from "../../shared/roles.decorator";
import { GetNewsByIdRequestDto } from "./dto/request/get-news-by-id-request.dto";
import { CreateNewsRequestDto } from "./dto/request/create-news-request.dto";
import { UpdateNewsRequestDto } from "./dto/request/update-news-request.dto";
import { DeleteNewsRequestDto } from "./dto/request/delete-news-request.dto";
import { GetAllNewsResponseDto } from "./dto/response/get-all-news-response.dto";
import { GetNewsByIdResponseDto } from "./dto/response/get-news-by-id-response.dto";
import { GetTodayNewsResponseDto } from "./dto/response/get-today-news-response.dto";
import { GetAllNewsQuery } from "./application/query/get-all-news.query";
import { GetNewsByIdQuery } from "./application/query/get-news-by-id.query";
import { GetTodayNewsQuery } from "./application/query/get-today-news.query";
import { CreateNewsCommand } from "./application/command/create-news.command";
import { UpdateNewsCommand } from "./application/command/update-news.command";
import { DeleteNewsCommand } from "./application/command/delete-news.command";

@ApiTags("News")
@Controller("news")
@ApiBearerAuth()
export class NewsController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get()
  async getAll() {
    return await this.queryBus.execute<GetAllNewsQuery, GetAllNewsResponseDto>(GetAllNewsQuery.of());
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/:id')
  async getById(@Param() getNewsByIdRequest: GetNewsByIdRequestDto) {
    return await this.queryBus.execute<GetNewsByIdQuery, GetNewsByIdResponseDto>(GetNewsByIdQuery.of(getNewsByIdRequest));
  }

  @Get('/today')
  async getTodayNews() {
    return await this.queryBus.execute<GetTodayNewsQuery, GetTodayNewsResponseDto>(GetTodayNewsQuery.of());
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createNews(@Body() createNewsRequest: CreateNewsRequestDto) {
    return await this.commandBus.execute<CreateNewsCommand>(CreateNewsCommand.of(createNewsRequest));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put()
  async updateNews(@Body() updateNewsRequest: UpdateNewsRequestDto) {
    return await this.commandBus.execute<UpdateNewsCommand>(UpdateNewsCommand.of(updateNewsRequest));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete()
  async deleteNews(@Body() deleteNewsRequest: DeleteNewsRequestDto) {
    return await this.commandBus.execute<DeleteNewsCommand>(DeleteNewsCommand.of(deleteNewsRequest));
  }
}
