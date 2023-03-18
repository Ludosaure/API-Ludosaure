import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {GetAllUsersResponseDto} from './dto/response/get-all-users-response.dto';
import {GetAllUsersQuery} from './application/query/get-all-users.query';
import {JwtAuthGuard} from "../../shared/jwt-auth.guard";
import {RolesGuard} from "../../shared/roles.guard";
import {Role} from "../../infrastructure/model/enum/role";
import {Roles} from "../../shared/roles.decorator";
import {CloseAccountRequestDTO} from "./dto/request/close-account-request.dto";
import {CloseAccountCommand} from "./application/command/close-account.command";
import {UserNotFoundException} from "../../shared/exceptions/user-not-found.exception";

@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    this.commandBus = commandBus;
    this.queryBus = queryBus;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CLIENT, Role.ADMIN)
  @Post('/close-account')
  async closeAccount(@Body() closeAccountRequest: CloseAccountRequestDTO) {
    try {
      await this.commandBus.execute<CloseAccountCommand, void>(
          CloseAccountCommand.of(closeAccountRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else {
        console.error(error);
        throw new BadRequestException();
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CLIENT, Role.ADMIN)
  @Get()
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
