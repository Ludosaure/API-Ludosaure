import {Controller, Get, InternalServerErrorException, UseGuards,} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {GetAllUsersResponseDto} from './dto/response/get-all-users-response.dto';
import {GetAllUsersQuery} from './application/query/get-all-users.query';
import {JwtAuthGuard} from "../../shared/jwt-auth.guard";

@ApiTags('User')
@Controller('users')
export class UserController {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    this.commandBus = commandBus;
    this.queryBus = queryBus;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    try {
      return await this.queryBus.execute<
        GetAllUsersQuery,
        GetAllUsersResponseDto
      >(GetAllUsersQuery.of());
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
