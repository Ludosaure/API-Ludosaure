import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Post, Query, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {Roles} from "../../shared/roles.decorator";
import {Role} from "../../domain/model/enum/role";
import {GetUnavailabilitiesByGameIdRequestDto} from "./dto/request/get-unavailabilities-by-game-id-request.dto";
import {GetUnavailabilitiesByGameIdResponseDto} from "./dto/response/get-unavailabilities-by-game-id-response.dto";
import {GetUnavailabilitiesByGameIdQuery} from "./application/query/get-unavailabilities-by-game-id.query";
import {CreateUnavailabilityRequestDto} from "./dto/request/create-unavailability-request.dto";
import {CreateUnavailabilityCommand} from "./application/command/create-unavailability.command";
import {DeleteUnavailabilityRequestDto} from "./dto/request/delete-unavailability-request.dto";
import {DeleteUnavailabilityCommand} from "./application/command/delete-unavailability.command";

@ApiTags('Unavailability')
@Controller('unavailability')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UnavailabilityController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Roles(Role.ADMIN, Role.CLIENT)
    @Get('/getByGameId')
    async getUnavailabilitiesByGameId(@Query() getUnavailabilitiesByGameIdRequestDto: GetUnavailabilitiesByGameIdRequestDto) {
        return await this.queryBus.execute<GetUnavailabilitiesByGameIdQuery, GetUnavailabilitiesByGameIdResponseDto>
        (GetUnavailabilitiesByGameIdQuery.of(getUnavailabilitiesByGameIdRequestDto));
    }

    @Roles(Role.ADMIN)
    @Post('/create')
    async createUnavailability(@Body() createUnavailabilityRequest: CreateUnavailabilityRequestDto) {
        return await this.commandBus.execute<CreateUnavailabilityCommand>(CreateUnavailabilityCommand.of(createUnavailabilityRequest));
    }

    @Roles(Role.ADMIN)
    @Delete('/delete')
    async deleteUnavailability(@Body() deleteUnavailabilityRequest: DeleteUnavailabilityRequestDto) {
        return await this.commandBus.execute<DeleteUnavailabilityCommand>(DeleteUnavailabilityCommand.of(deleteUnavailabilityRequest));
    }

}
