import { GenerateInvoiceCommand } from "./generate-invoice.command";
import { InvoiceEntityRepository } from "../../invoice-entity.repository";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GenerateInvoiceResponseDto } from "../../dto/response/generate-invoice-response.dto";
import { AppUtils } from "../../../../shared/appUtils";
import axios from "axios";

const PDFDocument = require("pdfkit");

@CommandHandler(GenerateInvoiceCommand)
export class GenerateInvoiceHandler implements ICommandHandler<GenerateInvoiceCommand> {
  constructor(
    private readonly invoiceRepository: InvoiceEntityRepository,
  ) {
  }

  async execute(command: GenerateInvoiceCommand): Promise<any> {
    const invoice = await this.invoiceRepository.findById(command.id);

    const doc = new PDFDocument();
    const logo = await this.fetchImage(AppUtils.logoUrl);
    const filename = `facture_${invoice.invoiceNumber}.pdf`;
    doc.image(logo, 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text(`La ludosaure - Facture #${invoice.invoiceNumber}`, 110, 57)
      .fontSize(12)
      .text(AppUtils.address)
      .moveDown(2)
      .text(`${invoice.reservation.user.firstname} ${invoice.reservation.user.lastname}`, { align: "right" })
      .text(invoice.reservation.user.email, { align: "right" })
      .text(invoice.reservation.user.phone, { align: "right" })
      .moveDown(2);
    doc.fontSize(16).text("Facture", { align: "center" });
    doc.fontSize(12).text(`Facture ID: ${invoice.invoiceNumber}`);
    doc.fontSize(12).text(`Créé le: ${invoice.createdAt.toDateString()}`);
    doc.fontSize(12).text(`Montant: ${invoice.amount}`);
    doc.fontSize(12).text(`Date de début de réservation: ${invoice.reservation.startDate.toDateString()}`);
    doc.fontSize(12).text(`Date de fin de réservation: ${invoice.reservation.endDate.toDateString()}`);
    doc.fontSize(12).text(`Nom du client: ${invoice.reservation.user.firstname} ${invoice.reservation.user.lastname}`);
    doc.fontSize(12).text(`Email du client: ${invoice.reservation.user.email}`);

    doc.end();

    return new GenerateInvoiceResponseDto(doc, filename);
  }

  async fetchImage(src) {
    const image = await axios.get(src, {
        responseType: 'arraybuffer'
      })
    return image.data;
  }
}
