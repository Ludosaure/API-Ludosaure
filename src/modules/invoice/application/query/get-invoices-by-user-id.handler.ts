import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InvoiceEntityRepository } from "../../invoice-entity.repository";
import { GetInvoicesByUserIdQuery } from "./get-invoices-by-user-id.query";
import { GetInvoicesByUserIdResponseDto } from "../../dto/response/get-invoices-by-user-id-response.dto";

@QueryHandler(GetInvoicesByUserIdQuery)
export class GetInvoicesByUserIdHandler implements IQueryHandler<GetInvoicesByUserIdQuery> {
  constructor(
    private readonly invoiceRepository: InvoiceEntityRepository,
  ) {
  }

  async execute(query: GetInvoicesByUserIdQuery): Promise<GetInvoicesByUserIdResponseDto> {
    const invoices = await this.invoiceRepository.findByUserId(query.userId);
    return new GetInvoicesByUserIdResponseDto(invoices);
  }
}
