import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { Roles } from "../../shared/roles.decorator";
import { Role } from "../../domain/model/enum/role";
import { GetCgvResponseDto } from "./dto/response/get-cgv-response.dto";
import { GetCgvQuery } from "./application/query/get-cgv.query";
import { CreateCgvRequestDto } from "./dto/request/create-cgv-request.dto";
import { CreateCgvCommand } from "./application/command/create-cgv.command";

@ApiTags("CGV")
@Controller("cgv")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CgvController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get()
  @Roles(Role.ADMIN, Role.CLIENT)
  async getCgv(): Promise<GetCgvResponseDto> {
    return await this.queryBus.execute<GetCgvQuery, GetCgvResponseDto>(GetCgvQuery.of());
  }

  @Post()
  @Roles(Role.ADMIN)
  async createCgv(@Body() createCgvRequest: CreateCgvRequestDto): Promise<void> {
    return await this.commandBus.execute<CreateCgvCommand>(CreateCgvCommand.of(createCgvRequest));
  }
}
