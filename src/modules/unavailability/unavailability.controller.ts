import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, InternalServerErrorException, Post, Query, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {Roles} from "../../shared/roles.decorator";
import {Role} from "../../domain/model/enum/role";
import {GameNotFoundException} from "../../shared/exceptions/game-not-found.exception";
import {UnavailabilityNotFoundException} from "./exceptions/unavailability-not-found.exception";
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
@Roles(Role.ADMIN)
export class UnavailabilityController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Roles(Role.CLIENT)
    @Get('/getByGameId')
    async getUnavailabilitiesByGameId(@Query() getUnavailabilitiesByGameIdRequestDto: GetUnavailabilitiesByGameIdRequestDto) {
        try {
            return await this.queryBus.execute<
                GetUnavailabilitiesByGameIdQuery,
                GetUnavailabilitiesByGameIdResponseDto
            >(GetUnavailabilitiesByGameIdQuery.of(getUnavailabilitiesByGameIdRequestDto));
        } catch (error) {
            if (error instanceof GameNotFoundException) {
                throw new GameNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    @Post('/create')
    async createUnavailability(@Body() createUnavailabilityRequest: CreateUnavailabilityRequestDto) {
        try {
            return await this.commandBus.execute<CreateUnavailabilityCommand>(
                CreateUnavailabilityCommand.of(createUnavailabilityRequest)
            );
        } catch (error) {
            if (error instanceof GameNotFoundException) {
                throw new GameNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    @Post('/delete')
    async deleteUnavailability(@Body() deleteUnavailabilityRequest: DeleteUnavailabilityRequestDto) {
        try {
            return await this.commandBus.execute<DeleteUnavailabilityCommand>(
                DeleteUnavailabilityCommand.of(deleteUnavailabilityRequest)
            );
        } catch (error) {
            if (error instanceof UnavailabilityNotFoundException) {
                throw new UnavailabilityNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

}
