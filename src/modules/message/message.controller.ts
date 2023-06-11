import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { Roles } from "../../shared/roles.decorator";
import { Role } from "../../domain/model/enum/role";
import { GetMyConversationsResponseDto } from "./dto/response/get-my-conversations-response.dto";
import { GetConversationByUserIdResponseDto } from "./dto/response/get-conversation-by-user-id-response.dto";
import { GetMyConversationsQuery } from "./application/query/get-my-conversations.query";
import { User } from "../../domain/model/user.entity";
import { GetConversationByUserIdRequestDto } from "./dto/request/get-conversation-by-user-id-request.dto";
import { GetConversationByUserIdQuery } from "./application/query/get-conversation-by-user-id.query";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT, Role.ADMIN)
  @Get()
  async getMyConversations(@Req() request) {
    const user: User = request.user;
    return await this.queryBus.execute<GetMyConversationsQuery, GetMyConversationsResponseDto>(GetMyConversationsQuery.of(user.id));
  }

  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT, Role.ADMIN)
  @Get('/conversation/:userId')
  async getConversationByUserId(@Param() getConversationByUserIdRequest: GetConversationByUserIdRequestDto, @Req() request) {
    return await this.queryBus.execute<GetConversationByUserIdQuery, GetConversationByUserIdResponseDto>(GetConversationByUserIdQuery.of(getConversationByUserIdRequest, request.user as User));
  }
}