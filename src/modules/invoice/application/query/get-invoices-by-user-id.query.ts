import { GetInvoicesByUserIdRequestDto } from "../../dto/request/get-invoices-by-user-id-request.dto";

export class GetInvoicesByUserIdQuery {
  public readonly userId: string;
  private constructor(userId: string) {
    this.userId = userId;
  }
  static of(getInvoicesByUserIdRequestDto: GetInvoicesByUserIdRequestDto): GetInvoicesByUserIdQuery {
    const { userId } = getInvoicesByUserIdRequestDto;
    return new GetInvoicesByUserIdQuery(userId);
  }
}
