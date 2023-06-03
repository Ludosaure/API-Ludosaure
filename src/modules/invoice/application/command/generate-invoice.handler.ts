import { GenerateInvoiceCommand } from "./generate-invoice.command";
import { InvoiceEntityRepository } from "../../invoice-entity.repository";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(GenerateInvoiceCommand)
export class GenerateInvoiceHandler implements ICommandHandler<GenerateInvoiceCommand> {
  constructor(
    private readonly invoiceRepository: InvoiceEntityRepository,
  ) {
  }

  async execute(command: GenerateInvoiceCommand): Promise<void> {}
}
