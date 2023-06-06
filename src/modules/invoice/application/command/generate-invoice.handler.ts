import { GenerateInvoiceCommand } from "./generate-invoice.command";
import { InvoiceEntityRepository } from "../../invoice-entity.repository";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GenerateInvoiceResponseDto } from "../../dto/response/generate-invoice-response.dto";
import { AppUtils } from "../../../../shared/appUtils";
import axios from "axios";
import { Invoice } from "../../../../domain/model/invoice.entity";
import InvoiceService from "../../invoice.service";

const PDFDocument = require("pdfkit-table");
const pdfTable = require('voilab-pdf-table');

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
      .text(`Réservation #${invoice.reservation.reservationNumber}`, 100)
      .text(`Facture créée le: ${invoice.createdAt.toLocaleDateString()}`)
      .moveDown()
      .text(`Début de réservation: ${invoice.reservation.startDate.toLocaleDateString()}`)
      .text(`Fin de réservation: ${invoice.reservation.endDate.toLocaleDateString()}`)
      .moveDown()
      .text(`Réduction appliquée: ${invoice.reservation.appliedPlan.reduction}%*`)
      .moveDown()
      .text(`Nombre de semaines totales facturées: ${invoice.reservation.nbWeeks}`);
    // TODO vérifier pour la première et deuxième facture
    if (alreadyPaidAmount > 0 && alreadyPaidWeeks > 0) {
      doc.text(`Montant déjà facturé: ${alreadyPaidAmount}€`)
        .text(`Nombre de semaines déjà facturées: ${alreadyPaidWeeks}`);
    }
    doc.moveDown(2);

    doc.table(invoiceTable, {
      x: 50,
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
      prepareRow: () => doc.font("Helvetica").fontSize(10)
    });

    doc.table(totalTable, {
      x: 150,
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
      prepareRow: () => doc.font("Helvetica").fontSize(12)
    });

    // footer
    doc.fontSize(8)
      .text(`* La réduction est appliquée sur le prix total de la réservation. Le prix est soustrait au pro rata de ce qui a déjà été facturé`, 100);

    doc.end();

    return new GenerateInvoiceResponseDto(doc, filename);
  }

  private initInvoiceTable(invoice: Invoice) {
    const datas = invoice.reservation.games.map(game => {
      const duration = invoice.nbWeeks;
      const priceHT = game.weeklyAmount * (1 - AppUtils.tva);
      const totalPriceHT = priceHT * duration;
      const tva = totalPriceHT * AppUtils.tva;
      return {
        game: game.name,
        nbWeeks: duration,
        priceHT: priceHT + "€",
        totalPriceHT: totalPriceHT + "€",
        tva: tva + "€"
      };
    });
    return {
      headers: [
        { label: "Jeu", property: "game", width: 150, renderer: null },
        { label: "Nombre de semaines", property: "nbWeeks", width: 135, renderer: null },
        { label: "Prix /sem HT", property: "priceHT", width: 75, renderer: null },
        { label: "Prix total HT", property: "totalPriceHT", width: 75, renderer: null },
        { label: "TVA (20%)", property: "tva", width: 75, renderer: null }
      ],
      datas: [
        datas
      ]
    };
  }

  private initTotalTable(invoice: Invoice) {
    const totalHTByGame = invoice.reservation.games.map(game => {
      const priceHT = game.weeklyAmount * (1 - AppUtils.tva);
      return priceHT * invoice.nbWeeks;
    });
    const totalHT = Math.round(totalHTByGame.reduce((globalTotalHT, gameTotalHT) => globalTotalHT + gameTotalHT, 0) * 100) / 100;
    const totalTva = Math.round(totalHT * AppUtils.tva * 100) / 100;
    // TODO réduction pas correcte
    const totalReduction = Math.round(invoice.reservation.totalAmount * (invoice.reservation.appliedPlan.reduction / 100) * 100) / 100;

    return {
      headers: [
        { label: "Total HT", property: "totalHT", width: 110, renderer: null },
        { label: "Total TVA (20%)", property: "totalTva", width: 110, renderer: null },
        { label: "Total réduction", property: "totalReduction", width: 110, renderer: null },
        { label: "TOTAL TTC", property: "totalTTC", width: 110, renderer: null }
      ],
      datas: [
        {
          totalHT: totalHT + "€",
          totalTva: totalTva + "€",
          totalReduction: totalReduction + "€",
          totalTTC: invoice.amount + "€"
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
