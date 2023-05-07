import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { Role } from "../../domain/model/enum/role";
import { Roles } from "../../shared/roles.decorator";
import { OwnGuard } from "../../shared/guards/own.guard";
import { GetAllReservationsResponseDto } from "./dto/response/get-all-reservations-response.dto";
import { GetReservationByIdResponseDto } from "./dto/response/get-reservation-by-id-response.dto";
import { CreateReservationRequestDto } from "./dto/request/create-reservation-request.dto";
import { UpdateReservationRequestDto } from "./dto/request/update-reservation-request.dto";
import { GetAllReservationsQuery } from "./application/query/get-all-reservations.query";
import { GetReservationByIdQuery } from "./application/query/get-reservation-by-id.query";
import { GetReservationByUserIdQuery } from "./application/query/get-reservation-by-user-id.query";
import { GetReservationByUserIdResponseDto } from "./dto/response/get-reservation-by-user-id-response.dto";
import { GetReservationByUserIdRequestDto } from "./dto/request/get-reservation-by-user-id-request.dto";
import { CreateReservationCommand } from "./application/command/create-reservation.command";
import { UpdateReservationCommand } from "./application/command/update-reservation.command";
import { CancelReservationRequestDto } from "./dto/request/cancel-reservation-request.dto";
import { ReturnReservationRequestDto } from "./dto/request/return-reservation-request.dto";
import { CancelReservationCommand } from "./application/command/cancel-reservation.command";
import { ReturnReservationCommand } from "./application/command/return-reservation.command";
import { GetReservationByIdRequestDto } from "./dto/request/get-reservation-by-id-request.dto";
import { User } from "../../domain/model/user.entity";

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
    @Get('/id/:id')
    async getReservationById(@Param() getReservationByIdRequest: GetReservationByIdRequestDto) {
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
    async createReservation(@Body() createReservationRequest: CreateReservationRequestDto, @Req() request) {
        const user: User = request.user;
        return await this.commandBus.execute<CreateReservationCommand>(CreateReservationCommand.of(createReservationRequest, user));
    }

    @UseGuards(OwnGuard)
    @Put()
    async updateReservation(@Body() updateReservationRequest: UpdateReservationRequestDto) {
        return await this.commandBus.execute<UpdateReservationCommand>(UpdateReservationCommand.of(updateReservationRequest));
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put('/cancel')
    async cancelReservation(@Body() cancelReservationRequestDto: CancelReservationRequestDto) {
        return await this.commandBus.execute<CancelReservationCommand>(CancelReservationCommand.of(cancelReservationRequestDto));
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put('/return')
    async returnReservation(@Body() returnReservationRequestDto: ReturnReservationRequestDto) {
        return await this.commandBus.execute<ReturnReservationCommand>(ReturnReservationCommand.of(returnReservationRequestDto));
    }
}
