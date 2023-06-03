import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/shared/roles.decorator";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { Role } from "../../domain/model/enum/role";
import { OwnReservationGuard } from "../../shared/guards/own-reservation.guard";
import { OwnGuard } from "../../shared/guards/own.guard";
import { GetInvoicesByReservationIdRequestDto } from "./dto/request/get-invoices-by-reservation-id-request.dto";
import { GenerateInvoiceRequestDto } from "./dto/request/generate-invoice-request.dto";
import { GetInvoicesByUserIdRequestDto } from "./dto/request/get-invoices-by-user-id-request.dto";
import { GetAllInvoicesResponseDto } from "./dto/response/get-all-invoices-response.dto";
import { GetInvoicesByReservationIdResponseDto } from "./dto/response/get-invoices-by-reservation-id-response.dto";
import { GetInvoicesByUserIdResponseDto } from "./dto/response/get-invoices-by-user-id-response.dto";
import { GetAllInvoicesQuery } from "./application/query/get-all-invoices.query";
import { GetInvoicesByReservationIdQuery } from "./application/query/get-invoices-by-reservation-id.query";
import { GetInvoicesByUserIdQuery } from "./application/query/get-invoices-by-user-id.query";
import { GenerateInvoiceCommand } from "./application/command/generate-invoice.command";

@ApiTags("Invoice")
@Controller("invoice")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InvoiceController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getAllInvoices() {
    return await this.queryBus.execute<GetAllInvoicesQuery, GetAllInvoicesResponseDto>(GetAllInvoicesQuery.of());
  }

  @Get('/reservation/:reservationId')
  @UseGuards(OwnReservationGuard)
  async getInvoicesByReservationId(@Param() getInvoicesByReservationIdRequest: GetInvoicesByReservationIdRequestDto) {
    return await this.queryBus.execute<GetInvoicesByReservationIdQuery, GetInvoicesByReservationIdResponseDto>(GetInvoicesByReservationIdQuery.of(getInvoicesByReservationIdRequest));
  }

  @Get('/user/:userId')
  @UseGuards(OwnGuard)
  async getInvoicesByUserId(@Param() getInvoicesByUserIdRequest: GetInvoicesByUserIdRequestDto) {
    return await this.queryBus.execute<GetInvoicesByUserIdQuery, GetInvoicesByUserIdResponseDto>(GetInvoicesByUserIdQuery.of(getInvoicesByUserIdRequest));
  }

  @Post('/generate/:id')
  @UseGuards(OwnGuard)
  async generateInvoiceById(@Param() generateInvoiceByIdRequest: GenerateInvoiceRequestDto) {
    return await this.commandBus.execute<GenerateInvoiceCommand>(GenerateInvoiceCommand.of(generateInvoiceByIdRequest));
  }
}
