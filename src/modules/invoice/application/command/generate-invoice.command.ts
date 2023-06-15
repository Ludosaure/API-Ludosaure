import { GenerateInvoiceRequestDto } from "../../dto/request/generate-invoice-request.dto";

export class GenerateInvoiceCommand {
  public readonly id: string;
  private constructor(id: string) {
    this.id = id;
  }
  static of(generateInvoiceByIdRequestDto: GenerateInvoiceRequestDto): GenerateInvoiceCommand {
    const { invoiceId } = generateInvoiceByIdRequestDto;
    return new GenerateInvoiceCommand(invoiceId);
  }
}
