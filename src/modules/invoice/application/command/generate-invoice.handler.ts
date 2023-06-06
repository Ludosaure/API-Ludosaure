import { GenerateInvoiceCommand } from "./generate-invoice.command";
import { InvoiceEntityRepository } from "../../invoice-entity.repository";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GenerateInvoiceResponseDto } from "../../dto/response/generate-invoice-response.dto";
import { AppUtils } from "../../../../shared/appUtils";
import axios from "axios";
import { Invoice } from "../../../../domain/model/invoice.entity";
import InvoiceService from "../../invoice.service";

const PDFDocument = require("pdfkit-table");

@CommandHandler(GenerateInvoiceCommand)
export class GenerateInvoiceHandler implements ICommandHandler<GenerateInvoiceCommand> {
  constructor(
    private readonly invoiceRepository: InvoiceEntityRepository,
    private readonly invoiceService: InvoiceService
  ) {
  }

  async execute(command: GenerateInvoiceCommand): Promise<any> {
    const invoice = await this.invoiceRepository.findById(command.id);

    const doc = new PDFDocument();

    const logo = await this.fetchImage(AppUtils.logoUrl);
    const filename = `facture_${invoice.invoiceNumber}.pdf`;

    const invoiceTable = this.initInvoiceTable(invoice);
    const totalTable = this.initTotalTable(invoice);

    const alreadyPaidAmount = await this.invoiceService.getPreviouslyInvoicedAmountForReservation(invoice.reservation.id, invoice);
    const alreadyPaidWeeks = await this.invoiceService.getPreviouslyInvoicedWeeksForReservation(invoice.reservation.id, invoice);
    // header
    doc.image(logo, 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text(`La ludosaure - Facture #${invoice.invoiceNumber}`, 110, 57)
      .fontSize(12)
      .text(AppUtils.address)
      .moveDown(2)
      .text(`${invoice.reservation.user.firstname} ${invoice.reservation.user.lastname}`, { align: "right" })
      .text(invoice.reservation.user.email, { align: "right" })
      .text(invoice.reservation.user.phone, { align: "right" });
    // body
    doc.fontSize(10)
      .text(`Réservation #${invoice.reservation.reservationNumber}`)
      .text(`Facture créée le: ${invoice.createdAt.toLocaleDateString()}`)
      .moveDown()
      .text(`Début de réservation: ${invoice.reservation.startDate.toLocaleDateString()}`)
      .text(`Fin de réservation: ${invoice.reservation.endDate.toLocaleDateString()}`)
      .moveDown()
      .text(`Nombre de semaines totales facturées: ${invoice.reservation.nbWeeks}`);
    // TODO vérifier pour la première et deuxième facture
    if (alreadyPaidAmount > 0 && alreadyPaidWeeks > 0) {
      doc.text(`Montant déjà facturé: ${alreadyPaidAmount}€`)
        .text(`Nombre de semaines déjà facturées: ${alreadyPaidWeeks}`);
    }
    doc.moveDown()
      .fontSize(16).text("Facture")
      .moveDown();

    doc.table(invoiceTable, {
      x: 50,
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
      prepareRow: (row, i) => doc.font("Helvetica").fontSize(10)
    });

    doc.table(totalTable, {
      x: 50,
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
      prepareRow: (row, i) => doc.font("Helvetica").fontSize(12)
    });
    doc.fontSize(12)
      .text(`Montant: ${invoice.amount}`);
    // détail des jeux
    doc.fontSize(16).text("Détail des jeux", { align: "center" });
    invoice.reservation.games.forEach(game => {
      console.log("game", game.name);
      const duration = invoice.nbWeeks;
      const priceTTC = game.weeklyAmount * duration;
      const priceHT = priceTTC * (1 - AppUtils.tva);
      doc.fontSize(12).text(`Nom du jeu: ${game.name}`)
        .text(`Prix du jeu: ${game.weeklyAmount}`)
        .text(`Nombre de semaines de location: ${duration}`)
        .text(`Prix total HT: ${priceHT}`)
        .text(`Prix total TTC: ${priceTTC}`);
    });

    // footer

    doc.end();

    return new GenerateInvoiceResponseDto(doc, filename);
  }

  private initInvoiceTable(invoice: Invoice) {
    return {
      headers: [
        { label: "Jeu", property: "game", width: 150, renderer: null },
        { label: "Nombre de semaines", property: "nbWeeks", width: 135, renderer: null },
        { label: "Prix /sem HT", property: "priceHT", width: 75, renderer: null },
        { label: "Prix total HT", property: "totalPriceHT", width: 75, renderer: null },
        { label: "TVA (20%)", property: "tva", width: 75, renderer: null }
      ],
      datas: [
        {
          game: "Donjon et dragon",
          nbWeeks: "2",
          priceHT: "4.5€",
          totalPriceHT: "9€",
          tva: "0,5€"
        }
      ]
    };
  }

  private initTotalTable(invoice: Invoice) {
    return {
      headers: [
        { label: "Total HT", property: "totalHT", width: 150, renderer: null },
        { label: "Total TVA (20%)", property: "tva", width: 150, renderer: null },
        { label: "TOTAL TTC", property: "totalTTC", width: 150, renderer: null }
      ],
      datas: [
        {
          totalHT: "9€",
          tva: "1€",
          totalTTC: "10€"
        }
      ]
    };
  }

  async fetchImage(src) {
    const image = await axios.get(src, {
      responseType: "arraybuffer"
    });
    return image.data;
  }
}
