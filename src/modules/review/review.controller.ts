import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { User } from "../../domain/model/user.entity";
import { GetReviewByIdResponseDto } from "./dto/response/get-review-by-id-response.dto";
import { GetReviewByGameIdResponseDto } from "./dto/response/get-review-by-game-id-response.dto";
import { GetReviewByIdRequestDto } from "./dto/request/get-review-by-id-request.dto";
import { GetReviewByGameIdRequestDto } from "./dto/request/get-review-by-game-id-request.dto";
import { DeleteReviewRequestDto } from "./dto/request/delete-review-request.dto";
import { UpdateReviewRequestDto } from "./dto/request/update-review-request.dto";
import { CreateReviewRequestDto } from "./dto/request/create-review-request.dto";
import { GetReviewByIdQuery } from "./application/query/get-review-by-id.query";
import { GetReviewByGameIdQuery } from "./application/query/get-review-by-game-id.query";
import { CreateReviewCommand } from "./application/command/create-review.command";
import { UpdateReviewCommand } from "./application/command/update-review.command";
import { DeleteReviewCommand } from "./application/command/delete-review.command";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { Roles } from "../../shared/roles.decorator";
import { Role } from "../../domain/model/enum/role";

@ApiBearerAuth()
@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get('/id/:id')
  async getById(@Param() getReviewByIdRequest: GetReviewByIdRequestDto) {
    return await this.queryBus.execute<GetReviewByIdQuery, GetReviewByIdResponseDto>
    (GetReviewByIdQuery.of(getReviewByIdRequest));
  }

  @Get('/game/:id')
  async getByGameId(@Param() getReviewByGameIdRequest: GetReviewByGameIdRequestDto) {
    return await this.queryBus.execute<GetReviewByGameIdQuery, GetReviewByGameIdResponseDto>
    (GetReviewByGameIdQuery.of(getReviewByGameIdRequest));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLIENT)
  @Post()
  async create(@Body() createReviewRequest: CreateReviewRequestDto, @Req() request) {
    return await this.commandBus.execute<CreateReviewCommand, void>
    (CreateReviewCommand.of(createReviewRequest, request.user as User));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLIENT)
  @Put()
  async update(@Body() updateReviewRequest: UpdateReviewRequestDto, @Req() request) {
    return await this.commandBus.execute<UpdateReviewCommand, void>
    (UpdateReviewCommand.of(updateReviewRequest, request.user as User));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLIENT)
  @Delete("/game/:gameId")
  async delete(@Param() deleteReviewRequest: DeleteReviewRequestDto, @Req() request) {
    return await this.commandBus.execute<DeleteReviewCommand, void>
    (DeleteReviewCommand.of(deleteReviewRequest, request.user as User));
  }
}
