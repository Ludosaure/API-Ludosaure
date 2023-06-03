import { GetAllInvoicesQuery } from "./get-all-invoices.query";
import { InvoiceEntityRepository } from "../../invoice-entity.repository";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllInvoicesResponseDto } from "../../dto/response/get-all-invoices-response.dto";

@QueryHandler(GetAllInvoicesQuery)
export class GetAllInvoicesHandler implements IQueryHandler<GetAllInvoicesQuery> {
  constructor(
    private readonly invoiceRepository: InvoiceEntityRepository,
  ) {
  }

  async execute(query: GetAllInvoicesQuery): Promise<GetAllInvoicesResponseDto> {
    const invoices = await this.invoiceRepository.findAll();
    return new GetAllInvoicesResponseDto(invoices);
  }
}
