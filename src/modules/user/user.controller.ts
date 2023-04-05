import {
  InternalServerErrorException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {GetAllUsersResponseDto} from './dto/response/get-all-users-response.dto';
import {GetAllUsersQuery} from './application/query/get-all-users.query';
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {Role} from "../../domain/model/enum/role";
import {Roles} from "../../shared/roles.decorator";
import {CloseAccountRequestDto} from "./dto/request/close-account-request.dto";
import {CloseAccountCommand} from "./application/command/close-account.command";
import {UserNotFoundException} from "../../shared/exceptions/user-not-found.exception";
import {UpdateUserCommand} from "./application/command/update-user.command";
import {UpdateUserRequestDto} from "./dto/request/update-user-request.dto";
import {UnsubscribeRequestDto} from "./dto/request/unsubscribe-request.dto";
import {UnsubscribeCommand} from "./application/command/unsubscribe.command";
import {OwnGuard} from "../../shared/guards/own.guard";

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
  @UseGuards(JwtAuthGuard, OwnGuard)
  @Post('/close-account')
  async closeAccount(@Body() closeAccountRequest: CloseAccountRequestDto) {
    try {
      await this.commandBus.execute<CloseAccountCommand, void>(
          CloseAccountCommand.of(closeAccountRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/all')
  async getAll(): Promise<GetAllUsersResponseDto> {
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, OwnGuard)
  @Post('/update')
  async update(@Body() updateUserRequest: UpdateUserRequestDto) {
    try {
      await this.commandBus.execute<UpdateUserCommand, void>(
          UpdateUserCommand.of(updateUserRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  @Get('/unsubscribe')
  async unsubscribe(@Query() unsubscribeRequest: UnsubscribeRequestDto) {
    try {
      await this.commandBus.execute<UnsubscribeCommand, void>(
          UnsubscribeCommand.of(unsubscribeRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
