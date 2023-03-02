import {Controller, Get, InternalServerErrorException, Query,} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ApiTags} from '@nestjs/swagger';
import {GetUsersByIdRequest} from './dto/request/get-users-by-id-request.dto';
import {GetUsersByIdQuery} from './application/query/get-users-by-id.query';
import {GetUsersByIdResponse} from './dto/response/get-users-by-id-response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    this.commandBus = commandBus;
    this.queryBus = queryBus;
  }

  @Get('/getById')
  async getById(@Query() getUsersByIdRequest: GetUsersByIdRequest) {
    try {
      return await this.queryBus.execute<
        GetUsersByIdQuery,
        GetUsersByIdResponse
      >(GetUsersByIdQuery.of(getUsersByIdRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
