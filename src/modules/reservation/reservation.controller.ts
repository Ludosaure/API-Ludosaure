import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
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
import { OwnReservationGuard } from "../../shared/guards/own-reservation.guard";
import { PayReservationRequestDto } from "./dto/request/pay-reservation-request.dto";
import { PayReservationCommand } from "./application/command/pay-reservation.command";
import { RemoveReservationRequestDto } from './dto/request/remove-reservation-request.dto';
import { RemoveReservationCommand } from './application/command/remove-reservation.command';

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

    @UseGuards(OwnReservationGuard)
    @Get('/id/:reservationId')
    async getReservationById(@Param() getReservationByIdRequest: GetReservationByIdRequestDto) {
        return await this.queryBus.execute<GetReservationByIdQuery, GetReservationByIdResponseDto>
        (GetReservationByIdQuery.of(getReservationByIdRequest));
    }

    @UseGuards(OwnGuard)
    @Get('/userId/:userId')
    async getReservationByUserId(@Param() getReservationByUserIdRequest: GetReservationByUserIdRequestDto) {
        return await this.queryBus.execute<GetReservationByUserIdQuery, GetReservationByUserIdResponseDto>
        (GetReservationByUserIdQuery.of(getReservationByUserIdRequest));
    }

    @UseGuards(RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Roles(Role.ADMIN, Role.CLIENT)
    @Post()
    async createReservation(@Body() createReservationRequest: CreateReservationRequestDto, @Req() request) {
        const user: User = request.user;
        return await this.commandBus.execute<CreateReservationCommand>(CreateReservationCommand.of(createReservationRequest, user));
    }

    @UseGuards(OwnReservationGuard)
    @Put()
    async updateReservation(@Body() updateReservationRequest: UpdateReservationRequestDto, @Req() request) {
        await this.commandBus.execute<UpdateReservationCommand>(UpdateReservationCommand.of(updateReservationRequest, request.user as User));
    }

    @UseGuards(OwnReservationGuard)
    @Put('/pay')
    async payReservation(@Body() payReservationRequestDto: PayReservationRequestDto) {
        await this.commandBus.execute<PayReservationCommand>(PayReservationCommand.of(payReservationRequestDto));
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put('/cancel')
    async cancelReservation(@Body() cancelReservationRequestDto: CancelReservationRequestDto) {
        await this.commandBus.execute<CancelReservationCommand>(CancelReservationCommand.of(cancelReservationRequestDto));
    }

    @UseGuards(OwnReservationGuard)
    @Delete('/:reservationId')
    async removeReservation(@Param() removeReservationRequestDto: RemoveReservationRequestDto) {
        await this.commandBus.execute<RemoveReservationCommand>(RemoveReservationCommand.of(removeReservationRequestDto));
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put('/return')
    async returnReservation(@Body() returnReservationRequestDto: ReturnReservationRequestDto) {
        await this.commandBus.execute<ReturnReservationCommand>(ReturnReservationCommand.of(returnReservationRequestDto));
    }
}
