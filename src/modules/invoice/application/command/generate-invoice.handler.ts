import { GenerateInvoiceCommand } from "./generate-invoice.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GenerateInvoiceResponseDto } from "../../dto/response/generate-invoice-response.dto";
import { AppUtils } from "../../../../shared/appUtils";
import axios from "axios";
import { Invoice } from "../../../../domain/model/invoice.entity";
import InvoiceService from "../../invoice.service";
import { InvoiceEntityRepository } from "../../invoice-entity.repository";

const PDFDocument = require("pdfkit-table");
const PDFTable = require("voilab-pdf-table");

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
      .text(`${invoice.firstname} ${invoice.lastname}`, { align: "right" })
      .text(invoice.email, { align: "right" })
      .text(invoice.phone, { align: "right" });

    // body
    doc.fontSize(10)
      .text(`Réservation #${invoice.reservationNumber}`, 100)
      .text(`Facture créée le: ${invoice.createdAt.toLocaleDateString()}`)
      .moveDown()
      .text(`Début de réservation: ${invoice.reservationStartDate.toLocaleDateString()}`)
      .text(`Fin de réservation: ${invoice.reservationEndDate.toLocaleDateString()}`)
      .moveDown()
      .text(`Réduction appliquée: ${invoice.reduction}%*`)
      .moveDown()
      .text(`Nombre de semaines totales facturées: ${invoice.reservationNbWeeks}`);
    if (alreadyPaidAmount > 0 && alreadyPaidWeeks > 0) {
      doc.text(`Montant déjà facturé: ${alreadyPaidAmount}€`)
        .text(`Nombre de semaines déjà facturées: ${alreadyPaidWeeks}`);
    }
    doc.moveDown(2);

    const invoiceTable = new PDFTable(doc);
    this.initInvoiceTable(invoice, invoiceTable);

    doc.moveDown(2)
      .table(totalTable, {
        x: 170,
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
        prepareRow: () => doc.font("Helvetica").fontSize(10)
      });

    // footer
    const totalReduction = AppUtils.roundToTwoDecimals(invoice.reservationTotalAmount * (invoice.reduction / 100) + Number.EPSILON);
    doc.fontSize(8)
      .text(`* La réduction est appliquée sur le prix total de la réservation. Le prix est soustrait au pro rata de ce qui a déjà été facturé`, 100)
      .text(`** Total réduction correspond à la réduction sur le montant de cette facture uniquement. La réduction totale au pro rata sur les précédentes factures est de ${totalReduction}€`)
      .end();

    return new GenerateInvoiceResponseDto(doc, filename);
  }

  private initInvoiceTable(invoice: Invoice, invoiceTable: any) {
    invoiceTable.addPlugin(new (require("voilab-pdf-table/plugins/fitcolumn"))(
      { column: "game" },
      { column: "nbWeeks" },
      { column: "priceHT" },
      { column: "totalHT" },
      { column: "tva" }
    ))
      .setColumnsDefaults({
        headerBorder: ['B'], headerPadding: [5], padding: [5]
      })
      .addColumns([
        {
          id: "game",
          header: "Jeu",
          width: 150
        },
        {
          id: "nbWeeks",
          header: "Nombre de semaines",
          width: 60
        },
        {
          id: "priceHT",
          header: "Prix /sem HT",
          width: 60,
          renderer: function(tb, data) {
            return data.priceHT + "€";
          }
        },
        {
          id: "tva",
          header: "TVA (20%)",
          width: 60,
          renderer: function(tb, data) {
            return data.tva + "€";
          },
        },
        {
          id: "totalHT",
          header: "Prix total HT",
          width: 60,
          renderer: function(tb, data) {
            return data.totalHT + "€";
          }
        },
        {
          id: "totalTva",
          header: "Total TVA (20%)",
          width: 60,
          renderer: function(tb, data) {
            return data.totalTva + "€";
          }
        }
      ])
      .onPageAdded(function(tb) {
        tb.addHeader();
      });

    invoiceTable.addBody(
      invoice.invoiceGames.map(invoiceGame => {
        const duration = invoice.invoiceNbWeeks;
        const weeklyAmount = invoiceGame.weeklyAmount;
        const tvaRate = AppUtils.tva;
        const priceHT = AppUtils.roundToTwoDecimals(weeklyAmount * (1 - tvaRate));
        const tva = AppUtils.roundToTwoDecimals(weeklyAmount * tvaRate);
        const totalPriceHT = AppUtils.roundToTwoDecimals(priceHT * duration);
        const totalTva = AppUtils.roundToTwoDecimals(tva * duration);
        return {
          game: invoiceGame.name,
          nbWeeks: duration,
          priceHT: priceHT,
          tva: tva,
          totalHT: totalPriceHT,
          totalTva: totalTva
        };
      }));
  }

  private initTotalTable(invoice: Invoice) {
    const totalHTByGame = invoice.invoiceGames.map(invoiceGame => {
      const priceHT = invoiceGame.weeklyAmount * (1 - AppUtils.tva);
      return priceHT * invoice.invoiceNbWeeks;
    });

    const totalHT = AppUtils.roundToTwoDecimals(totalHTByGame.reduce((globalTotalHT, gameTotalHT) => globalTotalHT + gameTotalHT, 0));
    const totalTva = invoice.invoiceGames.map(invoiceGame => {
      return invoiceGame.weeklyAmount * invoice.invoiceNbWeeks * AppUtils.tva;
    }).reduce((globalTotalTva, gameTotalTva) => globalTotalTva + gameTotalTva, 0);
    const reduction = AppUtils.roundToTwoDecimals((totalHT + totalTva) * (invoice.reduction / 100));

    return {
      headers: [
        { label: "Total HT", property: "totalHT", width: 100, renderer: null },
        { label: "Total TVA (20%)", property: "totalTva", width: 100, renderer: null },
        { label: "Réduction**", property: "reduction", width: 100, renderer: null },
        { label: "TOTAL TTC", property: "totalTTC", width: 100, renderer: null }
      ],
      datas: [
        {
          totalHT: totalHT + "€",
          totalTva: totalTva + "€",
          reduction: reduction + "€",
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
