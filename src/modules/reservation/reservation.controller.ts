import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Post, Put, Query, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {Role} from "../../domain/model/enum/role";
import {Roles} from "../../shared/roles.decorator";
import {OwnGuard} from "../../shared/guards/own.guard";
import {GetAllReservationsResponseDto} from "./dto/response/get-all-reservations-response.dto";
import {GetReservationByIdResponseDto} from "./dto/response/get-reservation-by-id-response.dto";
import {GetReservationByIdRequestDto} from "./dto/request/get-reservation-by-id-request.dto";
import {CreateReservationRequestDto} from "./dto/request/create-reservation-request.dto";
import {UpdateReservationRequestDto} from "./dto/request/update-reservation-request.dto";
import {GetAllReservationsQuery} from "./application/query/get-all-reservations.query";
import {GetReservationByIdQuery} from "./application/query/get-reservation-by-id.query";
import {GetReservationByUserIdQuery} from "./application/query/get-reservation-by-user-id.query";
import {GetReservationByUserIdResponseDto} from "./dto/response/get-reservation-by-user-id-response.dto";
import {GetReservationByUserIdRequestDto} from "./dto/request/get-reservation-by-user-id-request.dto";
import {CreateReservationCommand} from "./application/command/create-reservation.command";
import {UpdateReservationCommand} from "./application/command/update-reservation.command";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    async getAllReservations(): Promise<GetAllReservationsResponseDto> {
        return await this.queryBus.execute<GetAllReservationsQuery, GetAllReservationsResponseDto>
        (GetAllReservationsQuery.of());
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN, Role.CLIENT)
    @Get('/getById')
    async getReservationById(@Query() getReservationByIdRequest: GetReservationByIdRequestDto) {
        return await this.queryBus.execute<GetReservationByIdQuery, GetReservationByIdResponseDto>
        (GetReservationByIdQuery.of(getReservationByIdRequest));
    }

    @UseGuards(OwnGuard)
    @Get('/getByUserId')
    async getReservationByUserId(@Query() getReservationByUserIdRequest: GetReservationByUserIdRequestDto) {
        return await this.queryBus.execute<GetReservationByUserIdQuery, GetReservationByUserIdResponseDto>
        (GetReservationByUserIdQuery.of(getReservationByUserIdRequest));
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN, Role.CLIENT)
    @Post()
    async createReservation(@Body() createReservationRequest: CreateReservationRequestDto) {
        return await this.commandBus.execute<CreateReservationCommand>(CreateReservationCommand.of(createReservationRequest));
    }

    @UseGuards(OwnGuard)
    @Put()
    async updateReservation(@Body() updateReservationRequest: UpdateReservationRequestDto) {
        return await this.commandBus.execute<UpdateReservationCommand>(UpdateReservationCommand.of(updateReservationRequest));
    }
}
