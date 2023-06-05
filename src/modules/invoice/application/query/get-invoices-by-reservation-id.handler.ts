import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetInvoicesByReservationIdQuery } from "./get-invoices-by-reservation-id.query";
import { InvoiceEntityRepository } from "../../invoice-entity.repository";
import { GetInvoicesByReservationIdResponseDto } from "../../dto/response/get-invoices-by-reservation-id-response.dto";

@QueryHandler(GetInvoicesByReservationIdQuery)
export class GetInvoicesByReservationIdHandler implements IQueryHandler<GetInvoicesByReservationIdQuery> {
  constructor(
    private readonly invoiceRepository: InvoiceEntityRepository,
  ) {
  }

  async execute(query: GetInvoicesByReservationIdQuery): Promise<GetInvoicesByReservationIdResponseDto> {
    const invoices = await this.invoiceRepository.findByReservationId(query.reservationId);
    return new GetInvoicesByReservationIdResponseDto(invoices);
  }
}
