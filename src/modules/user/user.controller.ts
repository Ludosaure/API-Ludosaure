import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllUsersResponseDto } from "./dto/response/get-all-users-response.dto";
import { GetAllUsersQuery } from "./application/query/get-all-users.query";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { Role } from "../../domain/model/enum/role";
import { Roles } from "../../shared/roles.decorator";
import { CloseAccountRequestDto } from "./dto/request/close-account-request.dto";
import { CloseAccountCommand } from "./application/command/close-account.command";
import { UpdateUserCommand } from "./application/command/update-user.command";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";
import { UnsubscribeRequestDto } from "./dto/request/unsubscribe-request.dto";
import { UnsubscribeCommand } from "./application/command/unsubscribe.command";
import { OwnGuard } from "../../shared/guards/own.guard";
import { User } from "../../domain/model/user.entity";

@ApiTags("User")
@Controller("user")
export class UserController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, OwnGuard)
  @Post("/close-account")
  async closeAccount(@Body() closeAccountRequest: CloseAccountRequestDto) {
    await this.commandBus.execute<CloseAccountCommand>(CloseAccountCommand.of(closeAccountRequest));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll(): Promise<GetAllUsersResponseDto> {
    return await this.queryBus.execute<GetAllUsersQuery, GetAllUsersResponseDto>(GetAllUsersQuery.of());
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, OwnGuard)
  @Put()
  async update(@Body() updateUserRequest: UpdateUserRequestDto) {
    await this.commandBus.execute<UpdateUserCommand>(UpdateUserCommand.of(updateUserRequest));
  }

  @Get("/unsubscribe")
  async unsubscribe(@Query() unsubscribeRequest: UnsubscribeRequestDto) {
    await this.commandBus.execute<UnsubscribeCommand>(UnsubscribeCommand.of(unsubscribeRequest));
  }
  
}
